import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/articles`,
        {
          title: form.title,
          content: form.content,
          tags: form.tags.split(',').map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to create article');
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Article</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          rows="6"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
