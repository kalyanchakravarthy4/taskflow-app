import { useEffect, useState, useCallback, useContext } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const { role } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [taskInputs, setTaskInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchProjects = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get("/projects", {
        headers: { Authorization: "Bearer " + token }
      });
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async () => {
    if (!newProject.trim()) return;

    await axios.post("/projects",
      { name: newProject },
      { headers: { Authorization: "Bearer " + token } }
    );

    setNewProject("");
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;

    await axios.delete(`/projects/${id}`, {
      headers: { Authorization: "Bearer " + token }
    });

    fetchProjects();
  };

  const handleTaskInput = (projectId, value) => {
    setTaskInputs(prev => ({ ...prev, [projectId]: value }));
  };

  const handleAddTask = async (projectId) => {
    const title = taskInputs[projectId];
    if (!title?.trim()) return;

    await axios.post("/tasks",
      { title, status: "TODO", projectId },
      { headers: { Authorization: "Bearer " + token } }
    );

    setTaskInputs(prev => ({ ...prev, [projectId]: "" }));
    fetchProjects();
  };

  const handleUpdateStatus = async (taskId, status) => {
    await axios.put(`/tasks/${taskId}/status?status=${status}`, {}, {
      headers: { Authorization: "Bearer " + token }
    });

    fetchProjects();
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete task?")) return;

    await axios.delete(`/tasks/${taskId}`, {
      headers: { Authorization: "Bearer " + token }
    });

    fetchProjects();
  };

  const getStatusColor = (status) => {
    if (status === "TODO") return "#6b7280";
    if (status === "IN_PROGRESS") return "#f59e0b";
    if (status === "DONE") return "#10b981";
    return "#ccc";
  };

  return (
    <div style={{
      padding: "20px",
      background: "#f1f5f9",
      minHeight: "100vh",
      fontFamily: "Segoe UI"
    }}>

      {/* 🔥 NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        background: "linear-gradient(90deg,#4f46e5,#6366f1)",
        padding: "15px 20px",
        borderRadius: "12px",
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}>
        <h2>🚀 TaskFlow</h2>

        <div>
          <Link to="/dashboard" style={navLink}>Dashboard</Link>

          {role === "ADMIN" && (
            <>
              <Link to="/board" style={navLink}>Board</Link>
              <Link to="/analytics" style={navLink}>Analytics</Link>
            </>
          )}
        </div>

        <button onClick={handleLogout} style={{
          background:"#ef4444",
          border:"none",
          color:"white",
          padding:"8px 14px",
          borderRadius:"6px",
          cursor:"pointer"
        }}>
          Logout
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="🔍 Search project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          borderRadius:"8px",
          border:"1px solid #ddd",
          marginBottom:"20px"
        }}
      />

      {/* ➕ Create Project */}
      <div style={card}>
        <h3>Create Project</h3>

        <input
          value={newProject}
          onChange={(e)=>setNewProject(e.target.value)}
          placeholder="Project name"
          style={input}
        />

        <button onClick={handleCreateProject} style={primaryBtn}>
          Add
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* 📦 Projects */}
      {projects
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .map(p => (

        <div key={p.id} style={card}>

          <div style={{display:"flex", justifyContent:"space-between"}}>
            <h3>{p.name}</h3>

            {role === "ADMIN" && (
              <button onClick={() => handleDeleteProject(p.id)} style={dangerBtn}>
                Delete
              </button>
            )}
          </div>

          <p style={{color:"#666"}}>
            Total Tasks: {p.tasks?.length || 0}
          </p>

          <input
            placeholder="New task"
            value={taskInputs[p.id] || ""}
            onChange={(e)=>handleTaskInput(p.id, e.target.value)}
            style={input}
          />

          <button onClick={()=>handleAddTask(p.id)} style={primaryBtn}>
            Add Task
          </button>

          <ul style={{marginTop:"10px"}}>
            {(p.tasks || []).length === 0 && (
              <p style={{color:"#999"}}>No tasks</p>
            )}

            {(p.tasks || []).map(t => (
              <li key={t.id} style={taskCard}>

                <span>
                  {t.title}
                  <span style={{
                    marginLeft:"10px",
                    padding:"4px 10px",
                    borderRadius:"20px",
                    background:getStatusColor(t.status),
                    color:"white",
                    fontSize:"12px"
                  }}>
                    {t.status}
                  </span>
                </span>

                <div>
                  <select
                    value={t.status}
                    onChange={(e)=>handleUpdateStatus(t.id, e.target.value)}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>

                  <button
                    onClick={()=>handleDeleteTask(t.id)}
                    style={{marginLeft:"10px", color:"red"}}
                  >
                    ✖
                  </button>
                </div>

              </li>
            ))}
          </ul>

        </div>
      ))}
    </div>
  );
}

/* 🎨 Styles */
const navLink = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
  fontWeight: "500"
};

const card = {
  background:"white",
  padding:"18px",
  borderRadius:"12px",
  marginBottom:"15px",
  boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
};

const input = {
  padding:"10px",
  borderRadius:"6px",
  border:"1px solid #ccc",
  marginRight:"10px"
};

const primaryBtn = {
  background:"#4f46e5",
  color:"white",
  border:"none",
  padding:"8px 12px",
  borderRadius:"6px",
  cursor:"pointer"
};

const dangerBtn = {
  background:"#ef4444",
  color:"white",
  border:"none",
  padding:"6px 10px",
  borderRadius:"6px"
};

const taskCard = {
  display:"flex",
  justifyContent:"space-between",
  background:"#f9fafb",
  padding:"10px",
  marginTop:"6px",
  borderRadius:"8px",
  transition:"0.2s"
};

export default Dashboard;