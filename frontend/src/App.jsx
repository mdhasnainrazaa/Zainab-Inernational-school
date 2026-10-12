import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layout Components (Loaded directly for immediate shell rendering)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EnquiryModal from './components/common/EnquiryModal';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import RouteLoadingFallback from './components/common/RouteLoadingFallback';

// Public Pages (Route-based Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const KindergartenPage = lazy(() => import('./pages/KindergartenPage'));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage'));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const FeeStructurePage = lazy(() => import('./pages/FeeStructurePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin Pages & Layout (Strictly Isolated Chunk)
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminNotices = lazy(() => import('./pages/admin/AdminNotices'));

import { useAuth } from './context/AuthContext';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Guard for Admin
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Public Header */}
      {!isAdminRoute && (
        <Navbar onOpenEnquiry={() => setEnquiryModalOpen(true)} />
      )}

      {/* Main Routing Architecture with Suspense Code Splitting */}
      <div className="flex-grow">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/about" element={<AboutPage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/academics" element={<AcademicsPage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/kindergarten" element={<KindergartenPage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/facilities" element={<FacilitiesPage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/activities" element={<ActivitiesPage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/admissions" element={<AdmissionsPage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/fees" element={<FeeStructurePage onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/fee-structure" element={<Navigate to="/fees" replace />} />
            <Route path="/blog/*" element={<Navigate to="/" replace />} />
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Dashboard & CMS */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>

      {/* Public Footer & Floating Scroll To Top */}
      {!isAdminRoute && (
        <>
          <Footer onOpenEnquiry={() => setEnquiryModalOpen(true)} />
          <ScrollToTopButton />
        </>
      )}

      {/* Global Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
}
