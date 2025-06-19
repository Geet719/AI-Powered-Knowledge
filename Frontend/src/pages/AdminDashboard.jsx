import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      alert("Error fetching users",err);
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/users/promote/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User promoted to admin!");
      fetchUsers();
    } catch (err) {
      alert("Failed to promote user",err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                {user.role !== "admin" && (
                  <button
                    onClick={() => promoteToAdmin(user._id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Promote to Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
