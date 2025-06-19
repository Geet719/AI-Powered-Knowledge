import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddArticle from "./pages/AddArticle";
import ViewArticle from "./pages/ViewArticle";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminLanding from "./pages/AdminLanding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddArticle />} />
        <Route path="/articles/:id" element={<ViewArticle />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
          <Route path="/admin" element={<AdminLanding />} />

      </Routes>
    </>
  );
}

export default App;
