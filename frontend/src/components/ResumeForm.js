import React from 'react';
import './ResumeForm.css';
import { FaPlus, FaTrash, FaGripVertical } from 'react-icons/fa';
import ResumeUpload from './ResumeUpload';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handleInputChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeDataExtracted = (extractedData) => {
    setResumeData(extractedData);
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', location: '', degree: '', dates: '', details: [] }]
    }));
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...resumeData.education];
    newEducation[index][field] = value;
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addEducationDetail = (eduIndex) => {
    const newEducation = [...resumeData.education];
    newEducation[eduIndex].details = [...(newEducation[eduIndex].details || []), ''];
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const updateEducationDetail = (eduIndex, detailIndex, value) => {
    const newEducation = [...resumeData.education];
    newEducation[eduIndex].details[detailIndex] = value;
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const removeEducationDetail = (eduIndex, detailIndex) => {
    const newEducation = [...resumeData.education];
    newEducation[eduIndex].details = newEducation[eduIndex].details.filter((_, i) => i !== detailIndex);
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', location: '', dates: '', details: [] }]
    }));
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...resumeData.experience];
    newExperience[index][field] = value;
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addExperienceDetail = (expIndex) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].details = [...(newExperience[expIndex].details || []), ''];
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const updateExperienceDetail = (expIndex, detailIndex, value) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].details[detailIndex] = value;
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const removeExperienceDetail = (expIndex, detailIndex) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].details = newExperience[expIndex].details.filter((_, i) => i !== detailIndex);
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: '', items: '' }]
    }));
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index][field] = value;
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const removeSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', technologies: '', dates: '', details: [] }]
    }));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][field] = value;
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addProjectDetail = (projIndex) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].details = [...(newProjects[projIndex].details || []), ''];
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const updateProjectDetail = (projIndex, detailIndex, value) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].details[detailIndex] = value;
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const removeProjectDetail = (projIndex, detailIndex) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].details = newProjects[projIndex].details.filter((_, i) => i !== detailIndex);
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const addAchievement = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const updateAchievement = (index, value) => {
    const newAchievements = [...resumeData.achievements];
    newAchievements[index] = value;
    setResumeData(prev => ({ ...prev, achievements: newAchievements }));
  };

  const removeAchievement = (index) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="resume-form">
      <ResumeUpload onResumeDataExtracted={handleResumeDataExtracted} />
      
      <section className="form-section">
        <h2 className="section-title">Personal Information</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={resumeData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={resumeData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={resumeData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
              type="text"
              value={resumeData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <button className="add-button" onClick={addEducation}>
            <FaPlus /> Add Education
          </button>
        </div>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <FaGripVertical className="drag-handle" />
              <button className="remove-button" onClick={() => removeEducation(index)}>
                <FaTrash />
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="form-group">
                <label>Dates</label>
                <input
                  type="text"
                  value={edu.dates}
                  onChange={(e) => updateEducation(index, 'dates', e.target.value)}
                  placeholder="Sep 2020 - May 2024"
                />
              </div>
            </div>
            <div className="details-section">
              <label>Details (GPA, Awards, Coursework)</label>
              {edu.details?.map((detail, detailIndex) => (
                <div key={detailIndex} className="detail-input">
                  <input
                    type="text"
                    value={detail}
                    onChange={(e) => updateEducationDetail(index, detailIndex, e.target.value)}
                    placeholder="e.g., GPA: 3.8/4.0"
                  />
                  <button 
                    className="remove-detail-button" 
                    onClick={() => removeEducationDetail(index, detailIndex)}
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button className="add-detail-button" onClick={() => addEducationDetail(index)}>
                + Add Detail
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <button className="add-button" onClick={addExperience}>
            <FaPlus /> Add Experience
          </button>
        </div>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <FaGripVertical className="drag-handle" />
              <button className="remove-button" onClick={() => removeExperience(index)}>
                <FaTrash />
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder="Tech Company Inc."
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="form-group">
                <label>Dates</label>
                <input
                  type="text"
                  value={exp.dates}
                  onChange={(e) => updateExperience(index, 'dates', e.target.value)}
                  placeholder="Jun 2023 - Present"
                />
              </div>
            </div>
            <div className="details-section">
              <label>Responsibilities & Achievements</label>
              {exp.details?.map((detail, detailIndex) => (
                <div key={detailIndex} className="detail-input">
                  <textarea
                    value={detail}
                    onChange={(e) => updateExperienceDetail(index, detailIndex, e.target.value)}
                    placeholder="Describe your responsibility or achievement"
                    rows="1"
                  />
                  <button 
                    className="remove-detail-button" 
                    onClick={() => removeExperienceDetail(index, detailIndex)}
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button className="add-detail-button" onClick={() => addExperienceDetail(index)}>
                + Add Responsibility
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <button className="add-button" onClick={addProject}>
            <FaPlus /> Add Project
          </button>
        </div>
        {resumeData.projects.map((proj, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <FaGripVertical className="drag-handle" />
              <button className="remove-button" onClick={() => removeProject(index)}>
                <FaTrash />
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </div>
              <div className="form-group">
                <label>Technologies</label>
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="form-group full-width">
                <label>Dates</label>
                <input
                  type="text"
                  value={proj.dates}
                  onChange={(e) => updateProject(index, 'dates', e.target.value)}
                  placeholder="Jan 2023 - Mar 2023"
                />
              </div>
            </div>
            <div className="details-section">
              <label>Project Details</label>
              {proj.details?.map((detail, detailIndex) => (
                <div key={detailIndex} className="detail-input">
                  <textarea
                    value={detail}
                    onChange={(e) => updateProjectDetail(index, detailIndex, e.target.value)}
                    placeholder="Describe what you built or achieved"
                    rows="1"
                  />
                  <button 
                    className="remove-detail-button" 
                    onClick={() => removeProjectDetail(index, detailIndex)}
                    type="button"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button className="add-detail-button" onClick={() => addProjectDetail(index)}>
                + Add Detail
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
          <button className="add-button" onClick={addSkill}>
            <FaPlus /> Add Skill Category
          </button>
        </div>
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <FaGripVertical className="drag-handle" />
              <button className="remove-button" onClick={() => removeSkill(index)}>
                <FaTrash />
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => updateSkill(index, 'category', e.target.value)}
                  placeholder="Programming Languages"
                />
              </div>
              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  value={skill.items}
                  onChange={(e) => updateSkill(index, 'items', e.target.value)}
                  placeholder="Python, JavaScript, Java, C++"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Achievements</h2>
          <button className="add-button" onClick={addAchievement}>
            <FaPlus /> Add Achievement
          </button>
        </div>
        {resumeData.achievements.map((achievement, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <FaGripVertical className="drag-handle" />
              <button className="remove-button" onClick={() => removeAchievement(index)}>
                <FaTrash />
              </button>
            </div>
            <input
              type="text"
              value={achievement}
              onChange={(e) => updateAchievement(index, e.target.value)}
              placeholder="Dean's List, Academic Excellence Award"
              className="achievement-input"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumeForm;