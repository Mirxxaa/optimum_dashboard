import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would normally clear any authentication tokens or user data
    // For example, if using localStorage:
    // localStorage.removeItem('authToken');

    // Navigate back to login page
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-full p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-4 flex-grow">
        <li>
          <Link
            to="/dashboard/contact"
            className="text-white hover:bg-gray-700 p-2 rounded-md block"
          >
            Contact Form
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/careers"
            className="text-white hover:bg-gray-700 p-2 rounded-md block"
          >
            Careers Form
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/newsletters"
            className="text-white hover:bg-gray-700 p-2 rounded-md block"
          >
            Newsletters Emails
          </Link>
        </li>
        <li></li>
        <li>
          <Link
            to="/dashboard/jobs"
            className="text-white hover:bg-gray-700 p-2 rounded-md block"
          >
            Jobs
          </Link>
        </li>
      </ul>

      {/* Logout button at the bottom */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
