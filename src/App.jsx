// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers"; // Import your existing Careers page
import Newsletters from "./pages/Newsletters"; // Import your existing Newsletters page
import Sidebar from "./components/Sidebar";
import JobsApplications from "./pages/JobsApplications";

import Jobs from "./pages/Jobs";

// Layout component that includes Sidebar
const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard routes with sidebar */}
     <Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="contact" element={<ContactUs />} />
  <Route path="careers" element={<Careers />} />
  <Route path="newsletters" element={<Newsletters />} />
  <Route path="jobs" element={<Jobs />} />
  <Route path="JobsApplications" element={<JobsApplications />} />
  
  {/* Default redirect when visiting /dashboard */}
  <Route index element={<Navigate to="/dashboard/contact" replace />} />
</Route>

        {/* Redirect root to login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all route for any undefined paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
