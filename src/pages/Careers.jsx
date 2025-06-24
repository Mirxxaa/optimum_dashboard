import React, { useEffect, useState } from "react";
import axios from "axios";

const Careers = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // Track which is deleting

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("https://optimum-server-iqif.onrender.com/applications");
        setApplications(response.data);
      } catch (error) {
        setError("Error fetching applications");
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`https://optimum-server-iqif.onrender.com/applications/${id}`);
      // Remove deleted application from state
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      alert("Failed to delete application");
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading applications...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 p-6">
        {error}
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Careers Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-gray-50">
              {["SR No", "Name", "Phone", "Email", "CV", "Actions"].map((header) => (
                <th
                  key={header}
                  className="border-b border-gray-200 py-3 px-4 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <tr
                  key={application._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border-b border-gray-200 py-2 px-4">{index + 1}</td>
                  <td className="border-b border-gray-200 py-2 px-4">{application.name}</td>
                  <td className="border-b border-gray-200 py-2 px-4">{application.phone}</td>
                  <td className="border-b border-gray-200 py-2 px-4">{application.email}</td>
                  <td className="border-b border-gray-200 py-2 px-4">
                    <a
                      href={`https://optimum-server-iqif.onrender.com/applications/download/${application._id}`}
                      className="text-indigo-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download CV
                    </a>
                  </td>
                  <td className="border-b border-gray-200 py-2 px-4">
                    <button
                      onClick={() => handleDelete(application._id)}
                      disabled={deletingId === application._id}
                      className={`text-white px-3 py-1 rounded-md text-sm transition ${
                        deletingId === application._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === application._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-400 italic">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Careers;
