import React from 'react';
import './Templates.css';
import { FaCode, FaBriefcase, FaGraduationCap, FaRocket, FaAward, FaDownload } from 'react-icons/fa';

const Templates = ({ onTemplateSelect }) => {
  const templates = [
    {
      id: 'software-engineer',
      name: 'Software Engineer',
      icon: <FaCode />,
      description: 'Perfect for developers, programmers, and tech professionals',
      color: 'var(--accent-cyan)',
      data: {
        name: 'Alex Thompson',
        phone: '+1 (555) 123-4567',
        email: 'alex.thompson@email.com',
        linkedin: 'linkedin.com/in/alexthompson',
        education: [
          {
            institution: 'Stanford University',
            location: 'Stanford, CA',
            degree: 'Bachelor of Science in Computer Science',
            dates: 'Sep 2018 - Jun 2022',
            details: [
              'GPA: 3.8/4.0',
              'Relevant Coursework: Data Structures, Algorithms, Machine Learning, Software Engineering',
              'Dean\'s List: Fall 2020, Spring 2021'
            ]
          }
        ],
        experience: [
          {
            title: 'Senior Software Engineer',
            company: 'TechCorp',
            location: 'San Francisco, CA',
            dates: 'Jul 2022 - Present',
            details: [
              'Led development of microservices architecture serving 1M+ daily active users',
              'Implemented CI/CD pipelines reducing deployment time by 60%',
              'Mentored 3 junior developers and conducted code reviews',
              'Technologies: React, Node.js, Docker, Kubernetes, AWS'
            ]
          },
          {
            title: 'Software Engineering Intern',
            company: 'StartupXYZ',
            location: 'Palo Alto, CA',
            dates: 'Jun 2021 - Aug 2021',
            details: [
              'Built RESTful APIs handling 10K+ requests per minute',
              'Optimized database queries improving response time by 40%',
              'Collaborated with cross-functional teams using Agile methodology'
            ]
          }
        ],
        skills: [
          { category: 'Programming Languages', items: 'JavaScript, Python, Java, TypeScript, Go' },
          { category: 'Frameworks & Libraries', items: 'React, Node.js, Express, Django, Spring Boot' },
          { category: 'Databases', items: 'PostgreSQL, MongoDB, Redis, Elasticsearch' },
          { category: 'Cloud & DevOps', items: 'AWS, Docker, Kubernetes, Jenkins, Terraform' }
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            technologies: 'React, Node.js, PostgreSQL, Redis',
            dates: 'Jan 2022 - May 2022',
            details: [
              'Developed full-stack e-commerce platform with payment integration',
              'Implemented real-time inventory management system',
              'Achieved 99.9% uptime with automated testing and monitoring'
            ]
          }
        ],
        achievements: [
          'AWS Certified Solutions Architect',
          'Winner - University Hackathon 2021',
          'Published research paper on distributed systems'
        ]
      }
    },
    {
      id: 'business-professional',
      name: 'Business Professional',
      icon: <FaBriefcase />,
      description: 'Ideal for business analysts, managers, and consultants',
      color: 'var(--accent-purple)',
      data: {
        name: 'Sarah Chen',
        phone: '+1 (555) 987-6543',
        email: 'sarah.chen@email.com',
        linkedin: 'linkedin.com/in/sarahchen',
        education: [
          {
            institution: 'Harvard Business School',
            location: 'Boston, MA',
            degree: 'Master of Business Administration (MBA)',
            dates: 'Sep 2020 - Jun 2022',
            details: [
              'Concentration: Strategy and Operations',
              'GPA: 3.9/4.0',
              'President, Consulting Club'
            ]
          },
          {
            institution: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            degree: 'Bachelor of Arts in Economics',
            dates: 'Sep 2016 - May 2020',
            details: [
              'Magna Cum Laude',
              'Phi Beta Kappa Honor Society'
            ]
          }
        ],
        experience: [
          {
            title: 'Senior Business Analyst',
            company: 'McKinsey & Company',
            location: 'New York, NY',
            dates: 'Jul 2022 - Present',
            details: [
              'Led strategic initiatives for Fortune 500 clients across healthcare and technology sectors',
              'Developed financial models resulting in $50M+ cost savings for clients',
              'Managed cross-functional teams of 8+ consultants',
              'Presented findings to C-suite executives and board members'
            ]
          },
          {
            title: 'Business Analyst',
            company: 'Deloitte Consulting',
            location: 'Chicago, IL',
            dates: 'Aug 2020 - Jun 2022',
            details: [
              'Conducted market research and competitive analysis for client engagements',
              'Built data visualization dashboards using Tableau and Power BI',
              'Facilitated workshops with stakeholders to define business requirements'
            ]
          }
        ],
        skills: [
          { category: 'Analysis & Strategy', items: 'Financial Modeling, Market Research, Strategic Planning' },
          { category: 'Tools & Software', items: 'Excel, Tableau, Power BI, SQL, Python' },
          { category: 'Project Management', items: 'Agile, Scrum, Jira, Microsoft Project' },
          { category: 'Communication', items: 'Presentation, Stakeholder Management, Team Leadership' }
        ],
        projects: [
          {
            name: 'Digital Transformation Strategy',
            technologies: 'Strategic Analysis, Change Management',
            dates: 'Mar 2023 - Aug 2023',
            details: [
              'Developed 5-year digital roadmap for $2B manufacturing company',
              'Identified automation opportunities saving $20M annually',
              'Led change management initiatives affecting 500+ employees'
            ]
          }
        ],
        achievements: [
          'Top Performer Award - McKinsey & Company 2023',
          'CFA Level II Candidate',
          'Featured speaker at Business Analytics Conference 2023'
        ]
      }
    },
    {
      id: 'recent-graduate',
      name: 'Recent Graduate',
      icon: <FaGraduationCap />,
      description: 'Perfect for new graduates entering the job market',
      color: 'var(--accent-pink)',
      data: {
        name: 'Jordan Martinez',
        phone: '+1 (555) 456-7890',
        email: 'jordan.martinez@email.com',
        linkedin: 'linkedin.com/in/jordanmartinez',
        education: [
          {
            institution: 'University of Texas at Austin',
            location: 'Austin, TX',
            degree: 'Bachelor of Science in Marketing',
            dates: 'Aug 2020 - May 2024',
            details: [
              'GPA: 3.7/4.0',
              'Dean\'s List: Fall 2022, Spring 2023',
              'Relevant Coursework: Digital Marketing, Consumer Behavior, Data Analytics',
              'President, Marketing Student Association'
            ]
          }
        ],
        experience: [
          {
            title: 'Marketing Intern',
            company: 'Digital Solutions Inc.',
            location: 'Austin, TX',
            dates: 'Jun 2023 - Aug 2023',
            details: [
              'Assisted in developing social media campaigns reaching 100K+ users',
              'Conducted market research and competitor analysis',
              'Created content for company blog and social media platforms',
              'Collaborated with design team on marketing materials'
            ]
          },
          {
            title: 'Campus Brand Ambassador',
            company: 'Nike',
            location: 'Austin, TX',
            dates: 'Sep 2022 - May 2023',
            details: [
              'Promoted Nike products through campus events and social media',
              'Organized and executed 5 successful campus marketing events',
              'Built brand awareness among target demographic'
            ]
          }
        ],
        skills: [
          { category: 'Digital Marketing', items: 'Social Media Marketing, Google Analytics, SEO, SEM' },
          { category: 'Design Tools', items: 'Adobe Creative Suite, Canva, Figma' },
          { category: 'Analytics', items: 'Google Analytics, Facebook Insights, Excel, SPSS' },
          { category: 'Communication', items: 'Public Speaking, Content Creation, Team Collaboration' }
        ],
        projects: [
          {
            name: 'Senior Capstone Project',
            technologies: 'Market Research, Data Analysis',
            dates: 'Jan 2024 - May 2024',
            details: [
              'Developed comprehensive marketing strategy for local startup',
              'Conducted primary research with 200+ survey participants',
              'Presented findings to company executives and received implementation approval'
            ]
          }
        ],
        achievements: [
          'Academic Excellence Scholarship Recipient',
          'Google Analytics Certified',
          'Winner - University Marketing Case Competition 2023'
        ]
      }
    },
    {
      id: 'creative-professional',
      name: 'Creative Professional',
      icon: <FaRocket />,
      description: 'Great for designers, artists, and creative roles',
      color: 'var(--accent-orange)',
      data: {
        name: 'Maya Patel',
        phone: '+1 (555) 234-5678',
        email: 'maya.patel@email.com',
        linkedin: 'linkedin.com/in/mayapatel',
        education: [
          {
            institution: 'Rhode Island School of Design',
            location: 'Providence, RI',
            degree: 'Bachelor of Fine Arts in Graphic Design',
            dates: 'Sep 2019 - May 2023',
            details: [
              'Magna Cum Laude',
              'Concentration: Digital Media and User Experience',
              'Selected for RISD European Honors Program'
            ]
          }
        ],
        experience: [
          {
            title: 'Senior UX/UI Designer',
            company: 'Creative Studio Co.',
            location: 'Los Angeles, CA',
            dates: 'Jun 2023 - Present',
            details: [
              'Led design for mobile app with 500K+ downloads',
              'Created user-centered designs improving conversion rates by 35%',
              'Collaborated with product and engineering teams using Agile methodology',
              'Mentored 2 junior designers and established design system guidelines'
            ]
          },
          {
            title: 'Design Intern',
            company: 'Innovative Agency',
            location: 'New York, NY',
            dates: 'Jun 2022 - Aug 2022',
            details: [
              'Designed marketing materials for Fortune 500 clients',
              'Assisted in brand identity projects and website redesigns',
              'Created social media graphics and digital advertisements'
            ]
          }
        ],
        skills: [
          { category: 'Design Software', items: 'Adobe Creative Suite, Figma, Sketch, InVision' },
          { category: 'Web Technologies', items: 'HTML, CSS, JavaScript, React, WordPress' },
          { category: 'UX/UI Design', items: 'User Research, Wireframing, Prototyping, Usability Testing' },
          { category: 'Creative Skills', items: 'Branding, Typography, Color Theory, Photography' }
        ],
        projects: [
          {
            name: 'E-commerce App Redesign',
            technologies: 'Figma, User Research, Prototyping',
            dates: 'Sep 2023 - Dec 2023',
            details: [
              'Redesigned mobile shopping app interface based on user feedback',
              'Conducted user interviews and usability testing with 50+ participants',
              'Achieved 40% improvement in user task completion rates'
            ]
          }
        ],
        achievements: [
          'Adobe Certified Expert in Photoshop and Illustrator',
          'Winner - Student Design Awards 2023',
          'Featured in Design Magazine "30 Under 30" list'
        ]
      }
    },
    {
      id: 'executive-leader',
      name: 'Executive Leader',
      icon: <FaAward />,
      description: 'For senior executives, directors, and leadership roles',
      color: 'var(--accent-purple)',
      data: {
        name: 'Michael Johnson',
        phone: '+1 (555) 345-6789',
        email: 'michael.johnson@email.com',
        linkedin: 'linkedin.com/in/michaeljohnson',
        education: [
          {
            institution: 'Wharton School, University of Pennsylvania',
            location: 'Philadelphia, PA',
            degree: 'Master of Business Administration (MBA)',
            dates: 'Sep 2008 - May 2010',
            details: [
              'Concentration: Finance and Strategy',
              'Wharton Leadership Fellow'
            ]
          },
          {
            institution: 'Massachusetts Institute of Technology',
            location: 'Cambridge, MA',
            degree: 'Bachelor of Science in Electrical Engineering',
            dates: 'Sep 2004 - Jun 2008',
            details: [
              'Summa Cum Laude',
              'Tau Beta Pi Engineering Honor Society'
            ]
          }
        ],
        experience: [
          {
            title: 'Chief Technology Officer',
            company: 'InnovateTech Corp',
            location: 'Seattle, WA',
            dates: 'Jan 2020 - Present',
            details: [
              'Lead technology strategy for $500M+ revenue company with 1000+ employees',
              'Spearheaded digital transformation initiatives resulting in $100M+ cost savings',
              'Built and managed engineering teams across 5 global offices',
              'Board advisor for 3 early-stage technology startups'
            ]
          },
          {
            title: 'Vice President of Engineering',
            company: 'TechGiant Inc.',
            location: 'San Francisco, CA',
            dates: 'Mar 2015 - Dec 2019',
            details: [
              'Managed 200+ engineers across multiple product lines',
              'Led company\'s IPO technical readiness achieving successful $2B public offering',
              'Implemented Agile practices improving product delivery speed by 50%',
              'Established offshore development centers in 3 countries'
            ]
          }
        ],
        skills: [
          { category: 'Leadership', items: 'Strategic Planning, Team Building, Change Management, Board Governance' },
          { category: 'Technology', items: 'Cloud Architecture, AI/ML, Cybersecurity, DevOps' },
          { category: 'Business', items: 'P&L Management, M&A, IPO Readiness, Investor Relations' },
          { category: 'Communication', items: 'Public Speaking, Executive Presentation, Media Relations' }
        ],
        projects: [
          {
            name: 'AI-Driven Platform Migration',
            technologies: 'Cloud Architecture, Machine Learning',
            dates: 'Jan 2021 - Dec 2022',
            details: [
              'Led $50M platform modernization serving 10M+ users globally',
              'Implemented AI/ML capabilities increasing user engagement by 60%',
              'Achieved 99.99% uptime and reduced infrastructure costs by 30%'
            ]
          }
        ],
        achievements: [
          'Named "CTO of the Year" by Tech Leadership Awards 2023',
          'Board Member - Technology Innovation Council',
          'Keynote speaker at major industry conferences (AWS re:Invent, Google Cloud Next)',
          'Holds 5 patents in distributed systems and machine learning'
        ]
      }
    }
  ];

  return (
    <div className="templates-container">
      <div className="templates-hero">
        <h1 className="templates-title">Professional Templates</h1>
        <p className="templates-subtitle">
          Choose from our carefully crafted templates designed for different career paths
        </p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card" style={{ '--template-color': template.color }}>
            <div className="template-header">
              <div className="template-icon">
                {template.icon}
              </div>
              <h3 className="template-name">{template.name}</h3>
            </div>
            <p className="template-description">{template.description}</p>
            <div className="template-preview">
              <div className="mini-resume">
                <div className="mini-header">
                  <div className="mini-name">{template.data.name}</div>
                  <div className="mini-contact">{template.data.email}</div>
                </div>
                <div className="mini-section">
                  <div className="mini-section-title">Experience</div>
                  {template.data.experience.slice(0, 2).map((exp, idx) => (
                    <div key={idx} className="mini-item">
                      <div className="mini-job">{exp.title}</div>
                      <div className="mini-company">{exp.company}</div>
                    </div>
                  ))}
                </div>
                <div className="mini-section">
                  <div className="mini-section-title">Skills</div>
                  <div className="mini-skills">
                    {template.data.skills.slice(0, 2).map((skill, idx) => (
                      <div key={idx} className="mini-skill">{skill.category}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="template-actions">
              <button 
                className="template-use-btn"
                onClick={() => onTemplateSelect(template.data)}
              >
                <FaDownload /> Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="templates-info">
        <h2>Why Use Our Templates?</h2>
        <div className="info-grid">
          <div className="info-item">
            <h4>ATS Optimized</h4>
            <p>All templates are designed to pass Applicant Tracking Systems</p>
          </div>
          <div className="info-item">
            <h4>Industry Specific</h4>
            <p>Tailored layouts and content for different career fields</p>
          </div>
          <div className="info-item">
            <h4>Customizable</h4>
            <p>Easy to modify and personalize for your unique experience</p>
          </div>
          <div className="info-item">
            <h4>Professional</h4>
            <p>Clean, modern designs that make a great first impression</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;