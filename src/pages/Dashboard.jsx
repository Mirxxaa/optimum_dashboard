// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6">Welcome to Dashboard</h2>
        <p className="text-lg">You have successfully logged in!</p>
      </div>
    </div>
  );
};

export default Dashboard;
