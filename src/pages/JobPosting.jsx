import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const JobPosting = () => {
  const [jobData, setJobData] = useState({
    jobName: "",
    company: "",
    location: "",
    jobType: "",
    salaryRange: "",
    description: "",
    requirements: "",
    postDate: new Date().toLocaleDateString(),
    jobId: uuidv4(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "requirements") {
      setJobData({ ...jobData, [name]: value.split("\n") });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://optimum-server-iqif.onrender.com/jobs/add-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        console.log("Job Posted Successfully:", jobData);
        alert("Job posted successfully!");
      } else {
        alert("Failed to post the job!");
      }

      // Reset form and generate new Job ID
      setJobData({
        jobName: "",
        company: "",
        location: "",
        jobType: "",
        salaryRange: "",
        description: "",
        requirements: "",
        postDate: new Date().toLocaleDateString(),
        jobId: uuidv4(),
      });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center  p- bg-white rounded-xl ">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl flex landscape:flex-row flex-col">
        {/* Left Side - Decorative Section */}
        <div className="w-1/3 bg-blue-700 text-white p-8  flex-col justify-center rounded-l-xl landscape:block hidden">
          <h2 className="text-3xl font-bold mb-4">Post a New Job</h2>
          <p className="text-lg mb-6">
            Fill out the details for your job posting. Ensure all information is
            accurate and complete.
          </p>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-sm">
              <span className="font-bold">Tip:</span> Provide clear and detailed
              information to attract the best candidates.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="landscape:w-2/3 w-full p-8 overflow-y-auto max-h-[90vh]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Name
                </label>
                <input
                  type="text"
                  name="jobName"
                  value={jobData.jobName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                  <option value="">Select Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salaryRange"
                  value={jobData.salaryRange}
                  onChange={handleChange}
                  placeholder="e.g., $3000 - $5000"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Requirements
                </label>
                <textarea
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  placeholder="Enter each requirement on a new line"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <p>Job ID: {jobData.jobId}</p>
              <p>Post Date: {jobData.postDate}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition duration-300"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
