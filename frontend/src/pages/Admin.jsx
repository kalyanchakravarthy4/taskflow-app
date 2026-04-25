import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ FIX: wrap in useCallback
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("/admin/users", {
        headers: { Authorization: "Bearer " + token }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, [token]);

  // ✅ FIX: dependency stable now
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const makeAdmin = async (id) => {
    try {
      await axios.put(
        `/admin/users/${id}/role?role=ADMIN`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await axios.delete(`/admin/users/${id}`, {
        headers: { Authorization: "Bearer " + token }
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👑 Admin Panel</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => makeAdmin(u.id)}>
                  Make Admin
                </button>

                <button onClick={() => deleteUser(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
