import React, { useState } from 'react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import Preview from './components/Preview';
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

  return (
    <div className="App">
      <Header />
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
        </div>
        
        <div className="content-area">
          {activeTab === 'edit' ? (
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          ) : (
            <Preview resumeData={resumeData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;