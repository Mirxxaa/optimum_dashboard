import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [data, setData] = useState([]); // State to store backend data
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/messages");
        setData(response.data); // Assuming backend returns an array of messages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search input (by name, phone, email, or subject)
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.subject.toLowerCase().includes(searchTerm) ||
      (data.indexOf(item) + 1).toString().includes(searchTerm) // Allow searching by SR No
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us Form</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name, Phone, Email, or SR No."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-3 w-full border border-gray-300 rounded"
      />

      {/* Loading and Error Handling */}
      {loading && <p>Loading messages...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table for displaying data */}
      {!loading && !error && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">SR No</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Subject</th>
              <th className="py-2 px-4 border-b text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.phone}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.subject}</td>
                  <td className="py-2 px-4 border-b">{item.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactUs;
