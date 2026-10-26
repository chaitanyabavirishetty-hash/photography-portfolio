# Photography Portfolio (Angular + Node/Express + JSON file)

## 1. Backend
```bash
cd backend
npm install
npm start
# http://localhost:3000
```

## 2. Frontend
```bash
cd frontend
npm install
ng serve
# http://localhost:4200
```

## Features
- Home page with a cinematic photography hero section
- Photography gallery to display images
- Photographer portfolio and about section
- Contact form for enquiries
- Dark theme with neon-green styling
- Angular frontend connected to a Node.js/Express backend
- JSON file used for storing data

## API

```http
GET    /api/photos       # Get all photos
POST   /api/photos       # Add a photo
DELETE /api/photos/:id   # Delete a photo
POST   /api/contact      # Submit a contact enquiry
```

*Note: Confirm that these API routes match your actual backend code.*

## Technologies Used
- Angular
- TypeScript
- HTML5
- CSS3
- Node.js
- Express.js
- JSON file storage

## Project Structure
```text
photography-portfolio/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── main.ts
│   │   └── styles.css
│   └── package.json
├── backend/
│   ├── server.js
│   ├── data/
│   └── package.json
└── README.md
```

## Installation Requirements
- Node.js and npm
- Angular CLI

Install Angular CLI if required:
```bash
npm install -g @angular/cli
```

## Running the Project
1. Start the backend server on port 3000.
2. Start the Angular frontend on port 4200.
3. Open `http://localhost:4200` in your browser.

## Storage
Project data is stored in a JSON file on the backend. No MySQL database is required.

## Academic Purpose
This project was developed for learning Angular frontend development, Node.js and Express backend development, API integration, and JSON file handling.
