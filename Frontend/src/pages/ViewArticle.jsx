import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewArticle = () => {
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // 🧠 get role

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/articles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticle(res.data);
        setSummary(res.data.summary);
      } catch (err) {
        alert("Failed to fetch article", err.message);
        navigate("/dashboard");
      }
    };

    fetchArticle();
  }, [id, token, navigate]);

  const summarizeArticle = async () => {
    setLoadingSummary(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/articles/${id}/summarize`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSummary(res.data.summary);
    } catch (err) {
      alert("Summarization failed", err.message);
    }
    setLoadingSummary(false);
  };

  const deleteArticle = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Article deleted successfully.");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to delete article", err.message);
    }
  };

  if (!article) return <p className="text-center mt-10 text-gray-600">Loading article...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{article.title}</h2>

      <p className="text-sm text-gray-500 mb-4">
        Created: {new Date(article.createdAt).toLocaleDateString()} <br />
        <span className="text-gray-600">Tags:</span> {article.tags.join(", ")}
      </p>

      <div className="text-base text-gray-700 leading-relaxed">
        <p>{article.content}</p>

        {summary ? (
          <div className="mt-8 bg-purple-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Summary:</h3>
            <p>{summary}</p>
          </div>
        ) : (
          <button
            onClick={summarizeArticle}
            disabled={loadingSummary}
            className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingSummary ? "Summarizing..." : "Summarize Article"}
          </button>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Back to Dashboard
        </button>

        {user?.role === "admin" && (
          <button
            onClick={deleteArticle}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Delete Article
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewArticle;
