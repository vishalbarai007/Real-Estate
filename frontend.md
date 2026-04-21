# Frontend Documentation: Real Estate Portal

The frontend is a modern React application built with Vite, focusing on performance and user experience.

## 🚀 Getting Started
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 📦 Key Dependencies
- **React 19**: Core UI library.
- **Vite**: Build tool and development server.
- **Tailwind CSS 4**: For utility-first styling.
- **Framer Motion**: For interactive animations.
- **React Router Dom**: For client-side routing.
- **Axios**: For making API requests to the backend.
- **React Hot Toast**: For non-intrusive notifications.

## 📂 Directory Structure
- `src/components/`: Reusable UI elements (Navbar, Footer, etc.).
- `src/pages/`: Main views like `LandingPage`, `AdminDashboard`, and `AdminLogin`.
- `src/services/api.js`: Axios configuration and API call wrappers.
- `src/assets/`: Images and static resources.

## 🎨 Design and UI
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Animations**: Subtle entry and hover effects using Framer Motion.
- **Admin Interface**: A streamlined dashboard for managing sections of the landing page.

## 🛣 Routing
- `/`: Landing Page (Public)
- `/admin/login`: Admin Login Page (Public)
- `/admin/dashboard`: Protected Admin Panel (Requires Auth)

## 📡 API Integration
The frontend communicates with the backend via a centralized Axios instance in `services/api.js`. It handles token injection for protected requests.
