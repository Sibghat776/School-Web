import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TeacherApply = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    teacherName: '',
    fatherName: '',
    classAssigned: '',
    qualification: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const { teacherName, fatherName, classAssigned, qualification } = form;
    if (!teacherName.trim() || !fatherName.trim() || !classAssigned.trim() || !qualification.trim()) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post('/api/teacher/apply', {
        teacherName: form.teacherName.trim(),
        fatherName: form.fatherName.trim(),
        classAssigned: form.classAssigned.trim(),
        qualification: form.qualification.trim(),
      });
      toast.success('Application submitted successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-emerald-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Teacher Application
        </h2>
        <div className="grid gap-4">
          <input
            type="text"
            name="teacherName"
            placeholder="Teacher Name"
            value={form.teacherName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={form.fatherName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="classAssigned"
            placeholder="Class Assigned"
            value={form.classAssigned}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={form.qualification}
            onChange={handleChange}
            className="input"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherApply;
