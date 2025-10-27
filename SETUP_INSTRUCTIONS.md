# Project Setup Instructions

## 📦 Installation

This project uses **NPM Workspaces** for managing dependencies across multiple applications.

### Quick Start

1. **extract the project** to your local machine

2. Start frontend and backend server - 

3. Frontend server - Run from root of the project.
    **Install dependencies** (this will install for all workspaces):
   ```bash
   npm install
   ```
    **Start the development servers**:
   ```bash
   npm run preview
   ```
4. Backend server - Goto /backend
   ```bash
   npm install && npm run dev
   ```

That's it! The command will start:
- Host application on http://localhost:5170
- Backend API on http://localhost:3000
