# Real Estate Website with Admin Panel

A modern, production-ready Real Estate landing page with a dynamic Admin panel to update content securely in real-time. Built as a full-stack application.

## Technologies Used
- **Frontend**: React (Vite), Tailwind CSS (v4), React Router, Framer Motion, React Hot Toast
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: MongoDB (Mongoose)

## Features
- Highly responsive and modern UI using Tailwind CSS.
- Smooth micro-animations using Framer Motion.
- Fully dynamic contents (Hero text, Overview, Amenities, Nearby places, Updates, FAQs).
- Protected Admin Dashboard allowing edits to all text content.
- Toast notifications for user feedbacks.

---

## Folder Structure
```
.
├── backend/                  # Node.js + Express Backend
│   ├── config/               # Database Connection configuration
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # JWT Auth Middleware
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # API Routes Express Router
│   ├── .env                  # Environment Variables
│   ├── index.js              # Server entry point
│   ├── seed.js               # Database seeder
│   └── package.json    
└── frontend/                 # Vite + React Frontend
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # UI Components + Admin UI
    │   ├── pages/            # Application Pages (Landing, Dashboard, Login)
    │   ├── services/         # API Service (Axios client)
    │   ├── App.jsx           # App Layout & Routes
    │   ├── index.css         # Global Styles & Tailwind Root
    │   └── main.jsx          # React DOM render entry
    └── package.json          # Front dependencies
```

---

## Local Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory.
   ```bash
   cd backend
   ```
2. Install the necessary dependencies.
   ```bash
   npm install
   ```
3. Ensure `.env` is correctly populated with your variables (MongoDB URI, JWT secret, etc). Example provided in your existing instance.
4. Run the database seed to inject the initial data and the admin credentials.
   ```bash
   node seed.js
   ```
5. Start the backend development server.
   ```bash
   node index.js
   ```
   *The server will run on `http://localhost:5000`.*

### 2. Frontend Setup
1. Open a *new* terminal and navigate to the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies.
   ```bash
   npm install
   ```
3. Start the Vite development server.
   ```bash
   npm run dev
   ```
   *The client will run on your local network (usually `http://localhost:5173`).*

---

## Authentication Credentials
After running the seeder (`node seed.js`), log in at `/admin/login` using:
- **Email**: `admin@gmail.com`
- **Password**: `1234`

---

## Deployment Guide

### 1. Deploying the Database (MongoDB Atlas)
1. In your MongoDB Atlas Dashboard, make sure to whitelist all IP addresses (`0.0.0.0/0`) under Network Access so your backend host can connect.
2. Get the connection string for your database.

### 2. Deploying the Backend (Render)
1. In Render, create a new **Web Service**.
2. Connect your Git repository.
3. Configure the settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node index.js`
4. In Advanced settings, add the Environment Variables (`PORT`, `MONGODB_URI`, `JWT_SECRET`).
5. Wait for the deploy to complete and fetch the deployed Production URL.

### 3. Deploying the Frontend (Vercel)
1. Before deploying, update the `baseURL` in `frontend/src/services/api.js` to point to your deployed backend URL.
2. In Vercel, import your Git repository.
3. Configure settings:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
4. Click Deploy. Vercel will automatically run `npm run build` and host the `./dist` folder.

All done! Enjoy your modern Real Estate Portal. 🚀
