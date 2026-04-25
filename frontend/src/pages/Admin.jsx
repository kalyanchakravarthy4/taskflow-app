import { useEffect, useState } from "react";
import axios from "../api/axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await axios.get("/admin/users", {
      headers: { Authorization: "Bearer " + token }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const makeAdmin = async (id) => {
    await axios.put(`/admin/users/${id}/role?role=ADMIN`, {}, {
      headers: { Authorization: "Bearer " + token }
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await axios.delete(`/admin/users/${id}`, {
      headers: { Authorization: "Bearer " + token }
    });
    fetchUsers();
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
          {users.map(u => (
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
