import React, { useState } from 'react';
import axios from 'axios';
import './Preview.css';
import { FaDownload, FaCode, FaFilePdf, FaSpinner } from 'react-icons/fa';

const Preview = ({ resumeData }) => {
  const [loading, setLoading] = useState(false);
  const [showLatex, setShowLatex] = useState(false);
  const [latexCode, setLatexCode] = useState('');

  const handleCompile = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/compile', {
        resumeData
      }, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.name || 'resume'}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error compiling resume:', error);
      alert('Failed to compile resume. Please ensure LaTeX is installed on the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewLatex = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/latex', {
        resumeData
      });
      setLatexCode(response.data.latex);
      setShowLatex(true);
    } catch (error) {
      console.error('Error generating LaTeX:', error);
      alert('Failed to generate LaTeX code.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode);
    alert('LaTeX code copied to clipboard!');
  };

  const handleDownloadLatex = () => {
    const blob = new Blob([latexCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.name || 'resume'}_resume.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2>Resume Preview</h2>
        <div className="action-buttons">
          <button 
            className="action-button secondary"
            onClick={handleViewLatex}
            disabled={loading}
          >
            <FaCode /> View LaTeX
          </button>
          <button 
            className="action-button primary"
            onClick={handleCompile}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spin" /> Compiling...
              </>
            ) : (
              <>
                <FaFilePdf /> Compile to PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="preview-content">
        {!showLatex ? (
          <div className="resume-preview">
            <div className="preview-paper">
              <div className="preview-name">{resumeData.name || 'Your Name'}</div>
              <div className="preview-contact">
                {resumeData.phone && <span>{resumeData.phone}</span>}
                {resumeData.email && <span> | {resumeData.email}</span>}
                {resumeData.linkedin && <span> | {resumeData.linkedin}</span>}
              </div>

              {resumeData.education.length > 0 && (
                <div className="preview-section">
                  <h3>Education</h3>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="preview-item">
                      <div className="preview-item-header">
                        <strong>{edu.institution}</strong>
                        <span>{edu.dates}</span>
                      </div>
                      <div className="preview-item-subheader">
                        <em>{edu.degree}</em>
                        <span>{edu.location}</span>
                      </div>
                      {edu.details && edu.details.length > 0 && (
                        <ul className="preview-details">
                          {edu.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.experience.length > 0 && (
                <div className="preview-section">
                  <h3>Experience</h3>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="preview-item">
                      <div className="preview-item-header">
                        <strong>{exp.title}</strong>
                        <span>{exp.dates}</span>
                      </div>
                      <div className="preview-item-subheader">
                        <em>{exp.company}</em>
                        <span>{exp.location}</span>
                      </div>
                      {exp.details && exp.details.length > 0 && (
                        <ul className="preview-details">
                          {exp.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.projects.length > 0 && (
                <div className="preview-section">
                  <h3>Projects</h3>
                  {resumeData.projects.map((proj, index) => (
                    <div key={index} className="preview-item">
                      <div className="preview-item-header">
                        <strong>{proj.name}</strong> | <em>{proj.technologies}</em>
                        <span>{proj.dates}</span>
                      </div>
                      {proj.details && proj.details.length > 0 && (
                        <ul className="preview-details">
                          {proj.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.skills.length > 0 && (
                <div className="preview-section">
                  <h3>Skills</h3>
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="preview-skill">
                      <strong>{skill.category}:</strong> {skill.items}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.achievements.length > 0 && (
                <div className="preview-section">
                  <h3>Achievements</h3>
                  {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="preview-achievement">
                      • {achievement}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="latex-view">
            <div className="latex-header">
              <h3>LaTeX Code</h3>
              <div className="latex-actions">
                <button className="latex-button" onClick={handleCopyLatex}>
                  Copy Code
                </button>
                <button className="latex-button" onClick={handleDownloadLatex}>
                  <FaDownload /> Download .tex
                </button>
                <button className="latex-button" onClick={() => setShowLatex(false)}>
                  Back to Preview
                </button>
              </div>
            </div>
            <pre className="latex-code">
              <code>{latexCode}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="preview-instructions">
        <h4>Instructions:</h4>
        <ol>
          <li>Fill in your information in the Edit Resume tab</li>
          <li>Review your resume in the preview above</li>
          <li>Click "Compile to PDF" to generate and download your resume</li>
          <li>Optionally, view and download the LaTeX source code</li>
        </ol>
        <p className="note">
          <strong>Note:</strong> PDF compilation requires LaTeX to be installed on the server. 
          If compilation fails, you can download the .tex file and compile it locally.
        </p>
      </div>
    </div>
  );
};

export default Preview;