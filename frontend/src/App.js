import React, { useState } from 'react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import Preview from './components/Preview';
import Features from './components/Features';
import Templates from './components/Templates';
import Help from './components/Help';
import Header from './components/Header';

function App() {
  const [resumeData, setResumeData] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    achievements: []
  });

  const [activeTab, setActiveTab] = useState('edit');

  const handleTemplateSelect = (templateData) => {
    setResumeData(templateData);
    setActiveTab('edit');
  };

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-container">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            Edit Resume
          </button>
          <button 
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview & Export
          </button>
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          <button 
            className={`tab-button ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => setActiveTab('help')}
          >
            Help
          </button>
        </div>
        
        <div className="content-area">
          {activeTab === 'edit' && (
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          )}
          {activeTab === 'preview' && (
            <Preview resumeData={resumeData} />
          )}
          {activeTab === 'features' && (
            <Features />
          )}
          {activeTab === 'templates' && (
            <Templates onTemplateSelect={handleTemplateSelect} />
          )}
          {activeTab === 'help' && (
            <Help />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;