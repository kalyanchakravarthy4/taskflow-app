import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // 🔐 Role check
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "red" }}>🚫 Access Denied</h2>
        <p>Your role: <b>{role}</b></p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;