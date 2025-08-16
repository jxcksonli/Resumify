import React, { useState } from 'react';
import './Help.css';
import { 
  FaQuestionCircle, 
  FaRocket, 
  FaCode, 
  FaDownload, 
  FaCog, 
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaBook,
  FaLifeRing
} from 'react-icons/fa';

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I get started with Resumify?",
      answer: "Getting started is easy! Simply click on the 'Edit Resume' tab and start filling in your information. You can also choose from our pre-built templates in the 'Templates' section to get a head start with sample data.",
      category: "getting-started"
    },
    {
      question: "Do I need to install LaTeX on my computer?",
      answer: "No! Resumify uses a cloud-based LaTeX compiler, so you don't need to install anything. Just use the web application and click 'Compile to PDF' when you're ready to generate your resume.",
      category: "technical"
    },
    {
      question: "What if PDF compilation fails?",
      answer: "If PDF compilation fails, you can still download the LaTeX source code (.tex file) and compile it locally using any LaTeX editor like Overleaf, TeXShop, or MiKTeX. This ensures you always have access to your resume.",
      category: "troubleshooting"
    },
    {
      question: "Are my resume details stored or tracked?",
      answer: "No, we prioritize your privacy. Resumify doesn't store your personal information or track your data. All resume generation happens in real-time and temporary files are automatically deleted after compilation.",
      category: "privacy"
    },
    {
      question: "Can I customize the LaTeX template?",
      answer: "Yes! You can view and download the generated LaTeX code, then modify it as needed. The code uses standard LaTeX packages and is well-commented for easy customization.",
      category: "customization"
    },
    {
      question: "Is Resumify compatible with Applicant Tracking Systems (ATS)?",
      answer: "Absolutely! Our LaTeX templates are designed to be ATS-friendly, using standard formatting and avoiding complex layouts that might confuse automated systems.",
      category: "compatibility"
    },
    {
      question: "Can I use Resumify on mobile devices?",
      answer: "Yes, Resumify is fully responsive and works on all devices including smartphones and tablets. However, for the best editing experience, we recommend using a desktop or laptop computer.",
      category: "compatibility"
    },
    {
      question: "How do I add multiple positions at the same company?",
      answer: "Simply add multiple experience entries with the same company name but different job titles and dates. The LaTeX template will format them appropriately.",
      category: "formatting"
    }
  ];

  const quickStart = [
    {
      step: 1,
      title: "Choose a Template",
      description: "Browse our professional templates and select one that matches your career field",
      icon: <FaBook />
    },
    {
      step: 2,
      title: "Fill Your Information",
      description: "Add your personal details, experience, education, and skills in the easy-to-use form",
      icon: <FaCog />
    },
    {
      step: 3,
      title: "Preview Your Resume",
      description: "Check how your resume looks in the preview tab and make any necessary adjustments",
      icon: <FaPlay />
    },
    {
      step: 4,
      title: "Generate PDF",
      description: "Click 'Compile to PDF' to generate your professional resume instantly",
      icon: <FaDownload />
    }
  ];

  const tips = [
    {
      title: "Keep it concise",
      description: "Aim for 1-2 pages maximum. Recruiters typically spend 6-10 seconds on initial resume reviews.",
      icon: <FaRocket />
    },
    {
      title: "Use action verbs",
      description: "Start bullet points with strong action verbs like 'Led', 'Developed', 'Implemented', 'Achieved'.",
      icon: <FaPlay />
    },
    {
      title: "Quantify achievements",
      description: "Include numbers and percentages to demonstrate your impact: 'Increased sales by 25%' vs 'Increased sales'.",
      icon: <FaCode />
    },
    {
      title: "Tailor for each job",
      description: "Customize your resume for each application by highlighting relevant skills and experiences.",
      icon: <FaCog />
    },
    {
      title: "Proofread carefully",
      description: "Check for spelling, grammar, and formatting errors. Consider having someone else review it.",
      icon: <FaExclamationTriangle />
    },
    {
      title: "Include keywords",
      description: "Use industry-specific keywords from the job posting to pass ATS screening.",
      icon: <FaLifeRing />
    }
  ];

  const troubleshooting = [
    {
      issue: "PDF compilation is slow",
      solution: "Large resumes with many sections may take longer to compile. Try removing unnecessary details or splitting into multiple pages."
    },
    {
      issue: "Special characters not displaying",
      solution: "LaTeX has specific syntax for special characters. Use standard alphanumeric characters for best results."
    },
    {
      issue: "Form data disappeared",
      solution: "Resumify doesn't save data between sessions. Use templates or copy your content before refreshing the page."
    },
    {
      issue: "Resume looks different in PDF",
      solution: "The preview is an approximation. The PDF uses precise LaTeX formatting which may differ slightly from the preview."
    }
  ];

  return (
    <div className="help-container">
      <div className="help-hero">
        <h1 className="help-title">Help & Support</h1>
        <p className="help-subtitle">
          Everything you need to know about creating amazing resumes with Resumify
        </p>
      </div>

      {/* Quick Start Guide */}
      <section className="help-section">
        <h2 className="section-title">
          <FaRocket /> Quick Start Guide
        </h2>
        <div className="quick-start-grid">
          {quickStart.map((item) => (
            <div key={item.step} className="quick-start-item">
              <div className="step-number">{item.step}</div>
              <div className="step-icon">{item.icon}</div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resume Writing Tips */}
      <section className="help-section">
        <h2 className="section-title">
          <FaBook /> Resume Writing Tips
        </h2>
        <div className="tips-grid">
          {tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-description">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="help-section">
        <h2 className="section-title">
          <FaQuestionCircle /> Frequently Asked Questions
        </h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expandedFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="help-section">
        <h2 className="section-title">
          <FaExclamationTriangle /> Troubleshooting
        </h2>
        <div className="troubleshooting-grid">
          {troubleshooting.map((item, index) => (
            <div key={index} className="troubleshooting-item">
              <h4 className="issue-title">{item.issue}</h4>
              <p className="issue-solution">{item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Information */}
      <section className="help-section">
        <h2 className="section-title">
          <FaCode /> Technical Information
        </h2>
        <div className="tech-info">
          <div className="tech-item">
            <h4>LaTeX Engine</h4>
            <p>We use pdflatex for compilation with standard packages including geometry, titlesec, and hyperref.</p>
          </div>
          <div className="tech-item">
            <h4>Browser Support</h4>
            <p>Resumify works on all modern browsers including Chrome, Firefox, Safari, and Edge.</p>
          </div>
          <div className="tech-item">
            <h4>File Formats</h4>
            <p>Export options include PDF for applications and .tex source code for further customization.</p>
          </div>
          <div className="tech-item">
            <h4>Privacy & Security</h4>
            <p>All processing happens client-side and server-side. No personal data is stored or tracked.</p>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="help-section">
        <div className="support-cta">
          <h2>Still Need Help?</h2>
          <p>Can't find what you're looking for? We're here to help!</p>
          <div className="support-buttons">
            <button className="support-btn primary">
              <FaLifeRing /> Contact Support
            </button>
            <button className="support-btn secondary">
              <FaBook /> View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;