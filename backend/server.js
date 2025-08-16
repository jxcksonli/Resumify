const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const tempDir = path.join(__dirname, 'temp');
fs.ensureDirSync(tempDir);

// Configure multer for file uploads
const upload = multer({
  dest: tempDir,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'), false);
    }
  }
});

// Resume parsing functions
const extractEducation = (text) => {
  const education = [];
  const educationSection = text.match(/(?:education|academic|university|college|school|degree)(.*?)(?=(?:experience|employment|work|skills|projects|achievements)|$)/is);
  
  if (educationSection) {
    const lines = educationSection[1].split('\n').filter(line => line.trim());
    let currentEdu = {};
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      // Look for degree patterns
      if (trimmed.match(/bachelor|master|phd|doctorate|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|diploma/i)) {
        if (currentEdu.institution) {
          education.push(currentEdu);
        }
        currentEdu = { degree: trimmed, details: [] };
      }
      // Look for institution names
      else if (trimmed.match(/university|college|institute|school/i)) {
        currentEdu.institution = trimmed;
      }
      // Look for dates
      else if (trimmed.match(/\d{4}/)) {
        currentEdu.dates = trimmed;
      }
      // Look for location
      else if (trimmed.match(/,\s*[A-Z]{2}|,\s*[A-Z][a-z]+/)) {
        currentEdu.location = trimmed;
      }
      // Other details
      else if (trimmed.length > 10) {
        if (!currentEdu.details) currentEdu.details = [];
        currentEdu.details.push(trimmed);
      }
    }
    
    if (currentEdu.institution || currentEdu.degree) {
      education.push(currentEdu);
    }
  }
  
  return education.length > 0 ? education : [{
    institution: '',
    degree: '',
    location: '',
    dates: '',
    details: []
  }];
};

const extractExperience = (text) => {
  const experience = [];
  const experienceSection = text.match(/(?:experience|employment|work|career|professional)(.*?)(?=(?:education|skills|projects|achievements)|$)/is);
  
  if (experienceSection) {
    const lines = experienceSection[1].split('\n').filter(line => line.trim());
    let currentExp = {};
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      // Look for job titles
      if (trimmed.match(/engineer|developer|manager|analyst|coordinator|specialist|intern|assistant/i)) {
        if (currentExp.company) {
          experience.push(currentExp);
        }
        currentExp = { title: trimmed, details: [] };
      }
      // Look for company names
      else if (trimmed.match(/inc\.|llc|corp|company|technologies|solutions/i)) {
        currentExp.company = trimmed;
      }
      // Look for dates
      else if (trimmed.match(/\d{4}/)) {
        currentExp.dates = trimmed;
      }
      // Look for location
      else if (trimmed.match(/,\s*[A-Z]{2}|,\s*[A-Z][a-z]+/)) {
        currentExp.location = trimmed;
      }
      // Bullet points or achievements
      else if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.length > 15) {
        if (!currentExp.details) currentExp.details = [];
        currentExp.details.push(trimmed.replace(/^[•\-]\s*/, ''));
      }
    }
    
    if (currentExp.title || currentExp.company) {
      experience.push(currentExp);
    }
  }
  
  return experience.length > 0 ? experience : [{
    title: '',
    company: '',
    location: '',
    dates: '',
    details: []
  }];
};

const extractSkills = (text) => {
  const skills = [];
  const skillsSection = text.match(/(?:skills|technical|technologies|expertise)(.*?)(?=(?:experience|education|projects|achievements)|$)/is);
  
  if (skillsSection) {
    const lines = skillsSection[1].split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 5) {
        // Try to split by categories
        if (trimmed.includes(':')) {
          const [category, items] = trimmed.split(':', 2);
          skills.push({
            category: category.trim(),
            items: items.trim()
          });
        } else {
          skills.push({
            category: 'Technical Skills',
            items: trimmed
          });
        }
      }
    }
  }
  
  return skills.length > 0 ? skills : [{
    category: 'Technical Skills',
    items: ''
  }];
};

const extractContactInfo = (text) => {
  const contact = {};
  
  // Extract email
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) contact.email = emailMatch[1];
  
  // Extract phone
  const phoneMatch = text.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/);
  if (phoneMatch) contact.phone = phoneMatch[1];
  
  // Extract LinkedIn
  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin\.com\/pub\/)([a-zA-Z0-9-]+)/i);
  if (linkedinMatch) contact.linkedin = `linkedin.com/in/${linkedinMatch[1]}`;
  
  // Extract name (usually the first line or largest text)
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    contact.name = lines[0].trim();
  }
  
  return contact;
};

const parseResumeText = (text) => {
  const contact = extractContactInfo(text);
  const education = extractEducation(text);
  const experience = extractExperience(text);
  const skills = extractSkills(text);
  
  return {
    name: contact.name || '',
    email: contact.email || '',
    phone: contact.phone || '',
    linkedin: contact.linkedin || '',
    education,
    experience,
    skills,
    projects: [{
      name: '',
      technologies: '',
      dates: '',
      details: []
    }],
    achievements: ['']
  };
};

// Function to escape special LaTeX characters and fix Unicode issues
const escapeLatex = (text) => {
  if (!text) return '';
  
  // Convert to string if not already
  text = String(text);
  
  // Replace problematic Unicode characters
  text = text
    // Smart quotes and apostrophes
    .replace(/[\u2018\u2019]/g, "'")  // Smart single quotes
    .replace(/[\u201C\u201D]/g, '"')  // Smart double quotes
    .replace(/[\u2013]/g, '-')         // En dash
    .replace(/[\u2014]/g, '--')        // Em dash
    .replace(/[\u2026]/g, '...')      // Ellipsis
    // Ligatures
    .replace(/[\uFB00]/g, 'ff')       // ff ligature
    .replace(/[\uFB01]/g, 'fi')       // fi ligature  
    .replace(/[\uFB02]/g, 'fl')       // fl ligature
    .replace(/[\uFB03]/g, 'ffi')      // ffi ligature
    .replace(/[\uFB04]/g, 'ffl')      // ffl ligature
    // Remove any other non-ASCII characters
    .replace(/[\uE000-\uF8FF]/g, '')  // Private use area characters
    .replace(/[^\x00-\x7F]/g, '')     // Remove all non-ASCII
    // Escape LaTeX special characters
    .replace(/\\/g, '\\textbackslash ')
    .replace(/[{}]/g, '\\$&')
    .replace(/\$/g, '\\$')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\^/g, '\\^{}')
    .replace(/~/g, '\\~{}');
    
  return text;
};

const generateLatexTemplate = (resumeData) => {
  const {
    name = 'Your Name',
    phone = '+1 234 567 890',
    email = 'your.email@example.com',
    linkedin = 'linkedin.com/in/yourprofile',
    education = [],
    experience = [],
    skills = [],
    projects = [],
    achievements = []
  } = resumeData;

  const educationSection = education.length > 0 ? `
\\section{Education}
${education.map(edu => {
  // Process details - split by newlines if it's a single string
  let processedDetails = [];
  if (edu.details) {
    if (typeof edu.details === 'string') {
      // Split by newlines and filter out empty lines
      processedDetails = edu.details.split('\n').filter(line => line.trim());
    } else if (Array.isArray(edu.details)) {
      // If already an array, use as is
      processedDetails = edu.details;
    }
  }
  
  return `\\resumeSubheading
    {${escapeLatex(edu.institution || 'Institution')}}{${escapeLatex(edu.location || 'Location')}}
    {${escapeLatex(edu.degree || 'Degree')}}{${escapeLatex(edu.dates || 'Dates')}}
    ${processedDetails.length > 0 ? processedDetails.map(detail => `\\\\${escapeLatex(detail.trim())}`).join('') : ''}
`;
}).join('')}
` : '';

  const experienceSection = experience.length > 0 ? `
\\section{Experience}
${experience.map(exp => {
  // Process details - split by newlines if it's a single string
  let processedDetails = [];
  if (exp.details) {
    if (typeof exp.details === 'string') {
      // Split by newlines and filter out empty lines
      processedDetails = exp.details.split('\n').filter(line => line.trim());
    } else if (Array.isArray(exp.details)) {
      // If already an array, use as is
      processedDetails = exp.details;
    }
  }
  
  return `\\resumeSubheading
    {${escapeLatex(exp.title || 'Job Title')}}{${escapeLatex(exp.dates || 'Dates')}}
    {${escapeLatex(exp.company || 'Company')}}{${escapeLatex(exp.location || 'Location')}}
    ${processedDetails.length > 0 ? processedDetails.map(detail => `\\\\• ${escapeLatex(detail.trim())}`).join('') : ''}
`;
}).join('')}
` : '';

  const skillsSection = skills.length > 0 ? `
\\section{Skills}
${skills.map(skill => `\\textbf{${escapeLatex(skill.category)}}: ${escapeLatex(skill.items)}\\\\`).join('\n')}
` : '';

  const projectsSection = projects.length > 0 ? `
\\section{Projects}
${projects.map(proj => {
  // Process details - split by newlines if it's a single string
  let processedDetails = [];
  if (proj.details) {
    if (typeof proj.details === 'string') {
      // Split by newlines and filter out empty lines
      processedDetails = proj.details.split('\n').filter(line => line.trim());
    } else if (Array.isArray(proj.details)) {
      // If already an array, use as is
      processedDetails = proj.details;
    }
  }
  
  return `\\resumeProjectHeading
    {\\textbf{${escapeLatex(proj.name || 'Project Name')}} | ${escapeLatex(proj.technologies || 'Technologies')}}{${escapeLatex(proj.dates || 'Dates')}}
    ${processedDetails.length > 0 ? processedDetails.map(detail => `\\\\• ${escapeLatex(detail.trim())}`).join('') : ''}
`;
}).join('')}
` : '';

  const achievementsSection = achievements.length > 0 ? `
\\section{Achievements}
${achievements.filter(ach => ach.trim()).map(ach => `• ${escapeLatex(ach)}\\\\`).join('\n')}
` : '';

  return `%-------------------------
% Resume in Latex
% Generated by Resumify
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage[margin=1in]{geometry}
\\usepackage{tabularx}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Simple section formatting
\\renewcommand{\\section}[1]{
  \\vspace{10pt}
  \\textbf{\\large \\uppercase{#1}}
  \\vspace{5pt}
  \\hrule
  \\vspace{10pt}
}

% Simple commands without enumitem package
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{5pt}
  \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
    \\textit{#3} & \\textit{#4} \\\\
  \\end{tabular*}
  \\vspace{5pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
  \\vspace{5pt}
  \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
  \\end{tabular*}
  \\vspace{5pt}
}

\\begin{document}

\\begin{center}
    \\textbf{\\Large ${escapeLatex(name)}} \\\\
    \\vspace{10pt}
    ${escapeLatex(phone)} | ${escapeLatex(email)} | ${escapeLatex(linkedin)}
\\end{center}
\\vspace{20pt}

${educationSection}
${experienceSection}
${projectsSection}
${skillsSection}
${achievementsSection}

\\end{document}`;
};

app.post('/api/compile', async (req, res) => {
  const { resumeData } = req.body;
  const sessionId = uuidv4();
  const sessionDir = path.join(tempDir, sessionId);
  
  try {
    await fs.ensureDir(sessionDir);
    
    const latexContent = generateLatexTemplate(resumeData);
    const texFile = path.join(sessionDir, 'resume.tex');
    const pdfFile = path.join(sessionDir, 'resume.pdf');
    
    await fs.writeFile(texFile, latexContent);
    
    exec(`pdflatex -interaction=nonstopmode -output-directory="${sessionDir}" "${texFile}"`, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        console.error('LaTeX compilation error:', error);
        console.error('stdout:', stdout);
        console.error('stderr:', stderr);
        return res.status(500).json({ error: 'Failed to compile LaTeX', details: stderr || error.message });
      }
      
      fs.readFile(pdfFile, (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to read PDF file' });
        }
        
        res.contentType('application/pdf');
        res.send(data);
        
        setTimeout(() => {
          fs.remove(sessionDir).catch(console.error);
        }, 60000);
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/latex', async (req, res) => {
  const { resumeData } = req.body;
  
  try {
    const latexContent = generateLatexTemplate(resumeData);
    res.json({ latex: latexContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate LaTeX' });
  }
});

// Resume parsing endpoint
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    const filePath = req.file.path;
    const fileType = req.file.mimetype;
    let extractedText = '';

    try {
      if (fileType === 'application/pdf') {
        // Parse PDF
        const dataBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        extractedText = pdfData.text;
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Parse DOCX
        const result = await mammoth.extractRawText({ path: filePath });
        extractedText = result.value;
      } else {
        throw new Error('Unsupported file type');
      }

      // Parse the extracted text to structured data
      const resumeData = parseResumeText(extractedText);

      // Clean up uploaded file
      await fs.remove(filePath);

      res.json({
        success: true,
        message: 'Resume parsed successfully',
        resumeData: resumeData
      });

    } catch (parseError) {
      console.error('Parse error:', parseError);
      // Clean up uploaded file on error
      await fs.remove(filePath).catch(console.error);
      
      res.status(400).json({
        success: false,
        error: 'Failed to parse resume content. Please ensure the file is not password protected and contains readable text.'
      });
    }

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during file processing'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});