import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome Admin!</h2>
        <p className="text-gray-600 mb-6">Choose where you want to go:</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Go to Normal Dashboard
          </button>

          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
          >
            Go to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
