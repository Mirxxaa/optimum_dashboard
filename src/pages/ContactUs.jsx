import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [data, setData] = useState([]); // State to store backend data
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // Track which is deleting

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://optimum-server-iqif.onrender.com/messages"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      setDeletingId(id);
    await axios.delete(`https://optimum-server-iqif.onrender.com/messages/${id}`);

      // Remove deleted message from state
      setData((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      alert("Failed to delete message.");
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.subject.toLowerCase().includes(searchTerm) ||
      (data.indexOf(item) + 1).toString().includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Contact Us Messages</h2>

      <input
        type="text"
        placeholder="Search by Name, Phone, Email, or SR No."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
      />

      {loading && <p className="text-gray-500">Loading messages...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                {[
                  "SR No",
                  "Name",
                  "Phone",
                  "Email",
                  "Subject",
                  "Message",
                  "Actions",
                ].map((header) => (
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border-b border-gray-200 py-2 px-4">{index + 1}</td>
                    <td className="border-b border-gray-200 py-2 px-4">{item.name}</td>
                    <td className="border-b border-gray-200 py-2 px-4">{item.phone}</td>
                    <td className="border-b border-gray-200 py-2 px-4">{item.email}</td>
                    <td className="border-b border-gray-200 py-2 px-4">{item.subject}</td>
                    <td className="border-b border-gray-200 py-2 px-4">{item.message}</td>
                    <td className="border-b border-gray-200 py-2 px-4">
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className={`text-white px-3 py-1 rounded-md text-sm transition ${
                          deletingId === item._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-center text-gray-400 italic"
                  >
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
