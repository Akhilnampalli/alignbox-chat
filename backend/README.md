# Alignbox Chat Backend

This is the Express + MongoDB Atlas backend for the chat app.

## Setup
1. Clone this repo or extract the backend folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update your MongoDB Atlas URI and port.

4. Run the server:
   ```bash
   npm run dev
   ```

The backend runs on `http://localhost:5000`. API endpoints:
- `GET /api/messages` → fetch all messages
- `POST /api/messages` → send a new message
