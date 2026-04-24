import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      padding: "15px",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h3>🚀 TaskFlow</h3>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard">Dashboard</Link>

        {role === "ADMIN" && (
          <>
            <Link to="/board">Board</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/admin">Admin</Link> {/* ✅ */}
          </>
        )}
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;