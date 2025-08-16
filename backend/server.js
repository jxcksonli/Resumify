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
const PORT = process.env.PORT || 5000;

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
    details: ''
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
    details: ''
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
      details: ''
    }],
    achievements: ['']
  };
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
  \\resumeSubHeadingListStart
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
      
      return `
    \\resumeSubheading
      {${edu.institution || 'Institution'}}{${edu.location || 'Location'}}
      {${edu.degree || 'Degree'}}{${edu.dates || 'Dates'}}
      ${processedDetails.length > 0 ? `
      \\resumeItemListStart
        ${processedDetails.map(detail => `\\resumeItem{${detail.trim()}}`).join('\n        ')}
      \\resumeItemListEnd` : ''}
    `;
    }).join('')}
  \\resumeSubHeadingListEnd
` : '';

  const experienceSection = experience.length > 0 ? `
\\section{Experience}
  \\resumeSubHeadingListStart
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
      
      return `
    \\resumeSubheading
      {${exp.title || 'Job Title'}}{${exp.dates || 'Dates'}}
      {${exp.company || 'Company'}}{${exp.location || 'Location'}}
      ${processedDetails.length > 0 ? `
      \\resumeItemListStart
        ${processedDetails.map(detail => `\\resumeItem{${detail.trim()}}`).join('\n        ')}
      \\resumeItemListEnd` : ''}
    `;
    }).join('')}
  \\resumeSubHeadingListEnd
` : '';

  const skillsSection = skills.length > 0 ? `
\\section{Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${skills.map(skill => `\\textbf{${skill.category}}{: ${skill.items}}`).join(' \\\\\n     ')}
    }}
 \\end{itemize}
` : '';

  const projectsSection = projects.length > 0 ? `
\\section{Projects}
    \\resumeSubHeadingListStart
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
        
        return `
      \\resumeProjectHeading
          {\\textbf{${proj.name || 'Project Name'}} $|$ \\emph{${proj.technologies || 'Technologies'}}}{${proj.dates || 'Dates'}}
          ${processedDetails.length > 0 ? `
          \\resumeItemListStart
            ${processedDetails.map(detail => `\\resumeItem{${detail.trim()}}`).join('\n            ')}
          \\resumeItemListEnd` : ''}
      `;
      }).join('')}
    \\resumeSubHeadingListEnd
` : '';

  const achievementsSection = achievements.length > 0 ? `
\\section{Achievements}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     ${achievements.map(ach => `\\textbf{${ach}}`).join(' \\\\\n     ')}
    }}
 \\end{itemize}
` : '';

  return `%-------------------------
% Resume in Latex
% Generated by Resumify
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${name}} \\\\ \\vspace{1pt}
    \\small ${phone} $|$ \\href{mailto:${email}}{\\underline{${email}}} $|$ 
    \\href{https://${linkedin}}{\\underline{${linkedin}}}
\\end{center}

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
    
    exec(`pdflatex -output-directory="${sessionDir}" "${texFile}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('LaTeX compilation error:', error);
        return res.status(500).json({ error: 'Failed to compile LaTeX', details: stderr });
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