import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Complaint = () => {
  const [form, setForm] = useState({
    parentName: "",
    studentName: "",
    studentGRNumber: "",
    contactNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/complaints", form);
      toast.success("Complaint submitted successfully!");
      setForm({
        parentName: "",
        studentName: "",
        studentGRNumber: "",
        contactNumber: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Name *</label>
          <input
            type="text"
            name="parentName"
            value={form.parentName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student GR Number</label>
          <input
            type="text"
            name="studentGRNumber"
            value={form.studentGRNumber}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
          <input
            type="text"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default Complaint;
