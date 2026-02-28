# LearnHub Backend

This is the backend server for LearnHub, providing AI-powered features using Google Gemini.

## Setup

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Configuration**:
   - Create a `.env` file in the `server` directory (one has been created for you with placeholders).
   - Add your [Google Gemini API Key](https://aistudio.google.com/app/apikey) to the `GEMINI_API_KEY` variable.

3. **Run the Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

## API Endpoints

### `POST /api/career/roadmap`
Analyzes a resume and generates a career roadmap.
- **Form Data**:
  - `resume`: PDF/DOCX file
  - `role`: Target career role (e.g., "Software Development Engineer (SDE)")
