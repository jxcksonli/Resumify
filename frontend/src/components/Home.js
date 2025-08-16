import React from 'react';
import './Home.css';
import { FaArrowRight, FaFileAlt, FaPalette, FaDownload, FaEye } from 'react-icons/fa';

const Home = ({ setActiveTab }) => {
  const handleGetStarted = () => {
    setActiveTab('edit');
  };

  const handleViewTemplates = () => {
    setActiveTab('templates');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Resumify
            </h1>
            <p className="hero-subtitle">
              Your free professional resume builder. Transform your career story into a stunning, 
              LaTeX-powered resume that stands out from the crowd.
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={handleGetStarted}>
                Get Started Now <FaArrowRight className="cta-icon" />
              </button>
              <button className="cta-button secondary" onClick={handleViewTemplates}>
                View Templates <FaEye className="cta-icon" />
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="resume-mockup">
              <div className="mockup-header">
                <div className="mockup-profile">
                  <div className="profile-circle"></div>
                  <div className="profile-lines">
                    <div className="line line-name"></div>
                    <div className="line line-contact"></div>
                  </div>
                </div>
              </div>
              
              <div className="mockup-content">
                <div className="content-section">
                  <div className="section-title"></div>
                  <div className="section-lines">
                    <div className="content-line line-1"></div>
                    <div className="content-line line-2"></div>
                    <div className="content-line line-3"></div>
                  </div>
                </div>
                
                <div className="content-section">
                  <div className="section-title"></div>
                  <div className="section-lines">
                    <div className="content-line line-1"></div>
                    <div className="content-line line-2"></div>
                  </div>
                </div>
                
                <div className="content-section">
                  <div className="section-title"></div>
                  <div className="section-lines">
                    <div className="content-line line-1"></div>
                    <div className="content-line line-2"></div>
                    <div className="content-line line-3"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="floating-element element-1">
              <FaFileAlt />
            </div>
            <div className="floating-element element-2">
              <FaPalette />
            </div>
            <div className="floating-element element-3">
              <FaDownload />
            </div>
          </div>
        </div>
      </div>
      
      <div className="features-preview">
        <div className="feature-card">
          <div className="feature-icon">
            <FaFileAlt />
          </div>
          <h3>Easy to Use</h3>
          <p>Simple form-based interface for quick resume creation</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <FaPalette />
          </div>
          <h3>Professional Design</h3>
          <p>Beautiful LaTeX-powered formatting that impresses employers</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <FaDownload />
          </div>
          <h3>Instant Export</h3>
          <p>Download your resume as a high-quality PDF in seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Home;