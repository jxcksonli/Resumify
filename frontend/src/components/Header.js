import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="logo">Resumify</h1>
          <span className="tagline">Professional LaTeX Resume Generator</span>
        </div>
        <nav className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#templates" className="nav-link">Templates</a>
          <a href="#help" className="nav-link">Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;