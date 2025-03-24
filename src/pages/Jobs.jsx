import React, { useState, useEffect } from "react";
import {
  Trash2,
  MapPin,
  Wand2,
  Search,
  Clock,
  Plus,
  X, // Add X icon import
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import JobPosting from "./JobPosting"; // Ensure correct import path

// Helper function to format relative time
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffInSeconds < minute) return "Just now";
  if (diffInSeconds < hour)
    return `${Math.floor(diffInSeconds / minute)} min ago`;
  if (diffInSeconds < day) return `${Math.floor(diffInSeconds / hour)} hr ago`;
  if (diffInSeconds < week)
    return `${Math.floor(diffInSeconds / day)} days ago`;
  if (diffInSeconds < month)
    return `${Math.floor(diffInSeconds / week)} weeks ago`;
  if (diffInSeconds < year)
    return `${Math.floor(diffInSeconds / month)} months ago`;

  return `${Math.floor(diffInSeconds / year)} years ago`;
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/jobs/all-jobs");

        // Sort jobs by most recent first
        const sortedJobs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs", error);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Search and filter logic
  useEffect(() => {
    const results = jobs.filter(
      (job) =>
        job.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  // Handle job deletion
  const handleDelete = (jobId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:5000/jobs/delete-job/${jobId}`)
        .then((response) => {
          const updatedJobs = jobs.filter((job) => job._id !== jobId);
          setJobs(updatedJobs);
          setFilteredJobs(updatedJobs);
          alert("Job deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting job", error);
          alert("Failed to delete job");
        });
    }
  };

  // Handle new job modal
  const handleNewJobClick = () => {
    setCurrentJob(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentJob(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 "
        >
          <div className="container flex justify-between  items-center mx-auto ">
            <div className="text-left gap-2 flex flex-col">
              <h1 className="text-4xl font-extrabold text-blue-700">
                Job Posted
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-md">
                List of Jobs posted on Optibs.com
              </p>
            </div>

            <div className="flex justify-center ">
              <button
                onClick={handleNewJobClick}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 font-semibold text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Add New Job
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-start">
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="Search jobs by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
              >
                {filteredJobs.length} results
              </motion.span>
            )}
          </div>
        </div>

        {/* Job List */}
        <AnimatePresence>
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-xl shadow-lg"
            >
              <Wand2 className="mx-auto mb-4 w-16 h-16 text-blue-500" />
              <p className="text-2xl font-semibold text-gray-700">
                No Jobs Found
              </p>
              <p className="text-gray-500 mt-2">
                Try a different search term or check back later
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl   transition-all duration-300  border-2 border-gray-200 hover:border-blue-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-blue-800">
                        {job.jobName}
                      </h3>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-500  hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{job.location}</span>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {formatTimeAgo(job.createdAt)}
                      </div>
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Modal for New Job */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full max-w-6xl   rounded-2xl shadow-2xl "
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="  ">
                  <JobPosting job={currentJob} onClose={handleCloseModal} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Jobs;
