import React, { useState, useEffect } from 'react';
import {
  Download, User, Briefcase, Calendar, Phone, Mail, DollarSign, Trash2, CheckCircle
} from 'lucide-react';

const JobsApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
// Fetch applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://optimum-server-iqif.onrender.com/careers-applications');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Accept: Open email client
  const handleAccept = (email) => {
    window.location.href = `mailto:${email}?subject=Regarding Your Job Application&body=Dear Applicant,%0D%0A%0D%0AWe are pleased to inform you that...`;
  };

  // Reject: Delete application
  const handleReject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to reject this application?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://optimum-server-iqif.onrender.com/careers-applications/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      // Refresh the list
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const downloadCV = async (cvUrl, applicantName) => {
    try {
      const baseUrl = 'https://optimum-server-iqif.onrender.com';
      const fullUrl = `${baseUrl}${cvUrl}`;
      
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error('Failed to download CV');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${applicantName}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download CV: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
            <button 
              onClick={fetchApplications}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="mt-2 text-gray-600">
            Total Applications: {applications.length}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {applications.map((application) => (
        <div key={application._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{application.name}</h3>
                <p className="text-gray-600">{application.experience} years experience</p>
              </div>
            </div>
            <button
              onClick={() => downloadCV(application.cvUrl, application.name)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{application.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{application.phone}</span>
            </div>
          </div>

          {/* Job Details */}
          <div className="border-t pt-4 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Briefcase className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Applied for</h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <span className="font-medium text-gray-900">{application.jobName}</span>
                <span className="ml-2 text-sm text-gray-500">ID: {application.jobId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Salary: ${application.salaryRange}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">Posted: {formatDate(application.postedDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer: Accept / Reject / Date */}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-sm text-gray-500">Applied on: {formatDate(application.createdAt)}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept(application.email)}
                className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded"
              >
                <CheckCircle size={16} />
                <span>Accept</span>
              </button>
              <button
                onClick={() => handleReject(application._id)}
                className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded"
              >
                <Trash2 size={16} />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">There are no job applications to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsApplications;