# Project Overview: Real Estate Management System

This project is a full-stack web application designed for real estate businesses. It features a modern, responsive landing page for potential buyers and a secure admin dashboard for content management.

## 🏗 Architecture
The application follows a classic client-server architecture:
- **Frontend**: A single-page application (SPA) built with React and Vite.
- **Backend**: A RESTful API built with Node.js and Express.
- **Database**: MongoDB for persistent storage of project details, amenities, and user authentication data.

## 🚀 Key Features
- **Dynamic Content**: Most sections of the landing page (Hero, Overview, Amenities, FAQ, etc.) are dynamic and can be updated via the admin panel.
- **Secure Admin Panel**: Protected routes and JWT-based authentication ensure only authorized users can modify site content.
- **Modern UI/UX**: Uses Tailwind CSS for styling and Framer Motion for smooth animations.
- **Real-time Updates**: Content changes in the admin dashboard reflect immediately on the landing page.

## 🛠 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Axios, React Router.
- **Backend**: Node.js, Express, Mongoose, JSON Web Tokens (JWT), BcryptJS.
- **Database**: MongoDB.

## 📂 Repository Structure
- `frontend/`: React source code, components, and assets.
- `backend/`: Express server, database models, and API routes.
- `README.md`: Basic setup and deployment instructions.
