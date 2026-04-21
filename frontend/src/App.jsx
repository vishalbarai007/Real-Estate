import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import OurStoryPage from './pages/OurStoryPage';
import OurImpactPage from './pages/OurImpactPage';
import ProjectsListPage from './pages/ProjectsListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public pages with shared layout */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/our-impact" element={<OurImpactPage />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          {/* Catch-all to Home if path doesn't exist */}
          <Route path="*" element={<Home />} />
        </Route>

        {/* Admin routes (outside PageLayout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
