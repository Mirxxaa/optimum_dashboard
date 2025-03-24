import React, { useEffect, useState } from "react";
import axios from "axios";

const Careers = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applications from the backend when the component mounts
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/applications");
        setApplications(response.data); // Set the applications state with the response data
      } catch (error) {
        setError("Error fetching applications");
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Careers Applications</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">SR No</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{application.name}</td>
              <td className="py-2 px-4 border-b">{application.phone}</td>
              <td className="py-2 px-4 border-b">{application.email}</td>
              <td className="py-2 px-4 border-b">
                <a
                  href={`http://localhost:5000/applications/download/${application._id}`}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Careers;
