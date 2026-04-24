// context/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = (data) => {
    console.log("LOGIN DATA RECEIVED:", data);

    let tokenValue = null;
    let roleValue = null;

    // ✅ CASE 1: backend returns object
    if (typeof data === "object") {
      tokenValue = data.token;
      roleValue = data.role;
    }

    // ❌ DO NOT SUPPORT string anymore (remove confusion)
    if (!tokenValue || tokenValue === "undefined") {
      console.error("Invalid token:", data);
      alert("Login error: Invalid token");
      return;
    }

    // ✅ Store token
    localStorage.setItem("token", tokenValue);
    setToken(tokenValue);

    // ✅ Store role (VERY IMPORTANT)
    if (roleValue) {
      localStorage.setItem("role", roleValue);
      setRole(roleValue);
    } else {
      console.warn("⚠️ Role missing from backend");
      localStorage.setItem("role", "USER"); // fallback
      setRole("USER");
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};