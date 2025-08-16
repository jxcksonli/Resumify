import React, { useState } from 'react';
import './ResumeUpload.css';
import { FaUpload, FaFilePdf, FaFileWord, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ResumeUpload = ({ onResumeDataExtracted }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload only PDF or DOCX files.'
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({
        type: 'error',
        message: 'File size must be less than 10MB.'
      });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);

      // Send to backend for parsing
      const response = await fetch('http://localhost:5000/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 0 || !response.status) {
          throw new Error('Backend server not running. Please start the backend server first.');
        }
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setUploadStatus({
          type: 'success',
          message: 'Resume parsed successfully! Your information has been auto-filled.'
        });
        
        // Pass extracted data to parent component
        onResumeDataExtracted(result.resumeData);
      } else {
        throw new Error(result.error || 'Failed to parse resume');
      }
    } catch (error) {
      console.error('Upload error:', error);
      let errorMessage = 'Unable to read document. Please try again or fill manually.';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to backend server. Please ensure the backend is running on port 5000.';
      } else if (error.message && !error.message.includes('not found') && !error.message.includes('404')) {
        errorMessage = error.message;
      }
      
      setUploadStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resume-upload-container">
      <div className="upload-header">
        <h3>Quick Start: Upload Your Resume</h3>
        <p>Upload your existing resume (PDF or DOCX) to auto-fill your information and rebrand it professionally.</p>
      </div>

      <div 
        className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="resume-upload"
          className="upload-input"
          accept=".pdf,.docx"
          onChange={handleFileInput}
          disabled={uploading}
        />
        
        <div className="upload-content">
          {uploading ? (
            <>
              <FaSpinner className="upload-icon spin" />
              <h4>Processing Your Resume...</h4>
              <p>Please wait while we extract and organize your information.</p>
            </>
          ) : (
            <>
              <FaUpload className="upload-icon" />
              <h4>Drop your resume here or click to browse</h4>
              <p>Supported formats: PDF, DOCX (max 10MB)</p>
              <div className="file-types">
                <div className="file-type">
                  <FaFilePdf className="file-icon pdf" />
                  <span>PDF</span>
                </div>
                <div className="file-type">
                  <FaFileWord className="file-icon docx" />
                  <span>DOCX</span>
                </div>
              </div>
              <label htmlFor="resume-upload" className="upload-button">
                Choose File
              </label>
            </>
          )}
        </div>
      </div>

      {uploadStatus && (
        <div className={`upload-status ${uploadStatus.type}`}>
          {uploadStatus.type === 'success' ? (
            <FaCheckCircle className="status-icon" />
          ) : (
            <FaExclamationTriangle className="status-icon" />
          )}
          <p>{uploadStatus.message}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;