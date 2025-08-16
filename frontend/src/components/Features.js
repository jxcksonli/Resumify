import React from 'react';
import './Features.css';
import { 
  FaRocket, 
  FaCode, 
  FaPalette, 
  FaDownload, 
  FaMagic, 
  FaEye, 
  FaBolt, 
  FaLock,
  FaGlobe,
  FaMobileAlt,
  FaCloudUploadAlt,
  FaCog
} from 'react-icons/fa';

const Features = ({ setActiveTab }) => {
  const features = [
    {
      icon: <FaRocket />,
      title: "Lightning Fast",
      description: "Generate professional resumes in seconds with our optimized LaTeX engine",
      color: "var(--accent-purple)"
    },
    {
      icon: <FaCode />,
      title: "LaTeX Powered",
      description: "Industry-standard LaTeX typesetting ensures perfect formatting and ATS compatibility",
      color: "var(--accent-cyan)"
    },
    {
      icon: <FaPalette />,
      title: "Modern Design",
      description: "Sleek, cyberpunk-inspired interface with stunning visual effects and animations",
      color: "var(--accent-pink)"
    },
    {
      icon: <FaDownload />,
      title: "Multiple Formats",
      description: "Export as PDF for applications or LaTeX source code for customization",
      color: "var(--accent-orange)"
    },
    {
      icon: <FaMagic />,
      title: "Smart Templates",
      description: "Pre-built templates for different industries and career levels",
      color: "var(--accent-purple)"
    },
    {
      icon: <FaEye />,
      title: "Real-time Preview",
      description: "See exactly how your resume looks as you type with live preview",
      color: "var(--accent-cyan)"
    },
    {
      icon: <FaBolt />,
      title: "Instant Compile",
      description: "One-click PDF generation with our cloud-based LaTeX compiler",
      color: "var(--accent-pink)"
    },
    {
      icon: <FaLock />,
      title: "Privacy First",
      description: "Your data stays secure - no tracking, no storage, complete privacy",
      color: "var(--accent-orange)"
    },
    {
      icon: <FaGlobe />,
      title: "Cross-Platform",
      description: "Works on any device with a web browser - desktop, tablet, or mobile",
      color: "var(--accent-purple)"
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      description: "Fully optimized for mobile editing and on-the-go resume creation",
      color: "var(--accent-cyan)"
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "No Installation",
      description: "Pure web application - no software to download or install",
      color: "var(--accent-pink)"
    },
    {
      icon: <FaCog />,
      title: "Customizable",
      description: "Flexible sections and fields to match your unique professional story",
      color: "var(--accent-orange)"
    }
  ];

  const stats = [
    { number: "50K+", label: "Resumes Generated", color: "var(--accent-purple)" },
    { number: "99.9%", label: "ATS Compatible", color: "var(--accent-cyan)" },
    { number: "<2s", label: "Average Compile Time", color: "var(--accent-pink)" },
    { number: "24/7", label: "Available", color: "var(--accent-orange)" }
  ];

  return (
    <div className="features-container">
      <div className="features-hero">
        <h1 className="features-title">Powerful Features</h1>
        <p className="features-subtitle">
          Experience the future of resume creation with cutting-edge technology
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card" style={{ '--feature-color': feature.color }}>
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="features-cta">
        <h2>Ready to Create Your Perfect Resume?</h2>
        <p>Join thousands of professionals who trust Resumify for their career success</p>
        <div className="cta-buttons">
          <button className="cta-primary" onClick={() => setActiveTab('edit')}>Get Started Now</button>
          <button className="cta-secondary" onClick={() => setActiveTab('templates')}>View Templates</button>
        </div>
      </div>
    </div>
  );
};

export default Features;