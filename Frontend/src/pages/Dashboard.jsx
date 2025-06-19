import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');

    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/articles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(res.data);
      } catch (err) {
        alert('Failed to fetch articles', err.message);
      }
    };

    fetchArticles();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">All Articles</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Articles Section */}
      {articles.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="p-4 border border-gray-200 rounded-md shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Tags:</span> {article.tags?.join(', ')}
              </p>
              <p className="text-xs text-gray-500">
                Created: {new Date(article.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/articles/${article._id}`)}
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Article Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/add')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          + Add Article
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
