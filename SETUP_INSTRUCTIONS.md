# Resumify - Setup Instructions

## Prerequisites

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/

2. **LaTeX Distribution** (for PDF compilation)
   - **Windows**: Install MiKTeX from https://miktex.org/download
   - **Mac**: Install MacTeX from https://www.tug.org/mactex/
   - **Linux**: Install TeX Live: `sudo apt-get install texlive-full`

## Installation Steps

### 1. Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Verify LaTeX Installation

Test that LaTeX is installed correctly:

```powershell
pdflatex --version
```

You should see version information if LaTeX is properly installed.

## Running the Application

### Option 1: Run Both Frontend and Backend Together

From the project root directory in PowerShell:

```powershell
npm run dev
```

This will start:
- Backend server on http://localhost:5001
- Frontend development server on http://localhost:3000

### Option 2: Run Separately

#### PowerShell Terminal 1 - Backend:
```powershell
npm run server
```

#### PowerShell Terminal 2 - Frontend:
```powershell
cd frontend
npm start
```

## Usage

1. Open your browser and navigate to **http://localhost:3000**
2. Fill in your resume information in the "Edit Resume" tab
3. Switch to "Preview & Export" tab to see your resume
4. Click "Compile to PDF" to generate and download your resume as PDF
5. Optionally, click "View LaTeX" to see and download the LaTeX source code

## Features

- **Interactive Form**: Easy-to-use form with sections for:
  - Personal Information
  - Education
  - Experience
  - Projects
  - Skills
  - Achievements

- **Real-time Preview**: See how your resume looks before compiling

- **PDF Export**: Generate professional PDF resumes using LaTeX

- **LaTeX Code Access**: View and download the LaTeX source code

- **Modern UI**: Beautiful beige and royal color theme with smooth animations

## Troubleshooting

### PDF Compilation Fails

If PDF compilation fails:
1. Ensure LaTeX is properly installed and `pdflatex` is in your system PATH
2. Check the server console for error messages
3. You can still download the .tex file and compile it locally using any LaTeX editor

### Port Already in Use

If you get a "port already in use" error:
- Backend: Change the port in `backend/server.js` (line 12)
- Frontend: The React app will prompt you to use a different port

### Dependencies Installation Issues

If npm install fails in PowerShell:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules and package-lock.json:
   ```powershell
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   ```
3. Run `npm install` again

## Development

- Backend API runs on port 5001
- Frontend React app runs on port 3000
- Frontend is configured to proxy API requests to the backend

## Tech Stack

- **Frontend**: React, CSS3 with custom styling
- **Backend**: Node.js, Express
- **PDF Generation**: LaTeX (pdflatex)
- **Icons**: React Icons

## Notes

- Resume data is not persisted - it will be lost on page refresh
- For production deployment, consider adding:
  - Database for storing resumes
  - User authentication
  - Multiple template options
  - Resume sharing features