import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

const columns = ["TODO", "IN_PROGRESS", "DONE"];

function ProjectBoard() {
  const [tasks, setTasks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [hoverColumn, setHoverColumn] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ keep your fix
  const fetchTasks = useCallback(async () => {
    const res = await axios.get("/tasks", {
      headers: { Authorization: "Bearer " + token }
    });
    setTasks(res.data);
  }, [token]);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token, fetchTasks]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    if (event.over) {
      setHoverColumn(event.over.id);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    setActiveId(null);
    setHoverColumn(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    await axios.put(
      `/tasks/${taskId}/status?status=${newStatus}`,
      {},
      { headers: { Authorization: "Bearer " + token } }
    );

    fetchTasks();
  };

  const groupedTasks = columns.reduce((acc, col) => {
    acc[col] = tasks.filter(t => t.status === col);
    return acc;
  }, {});

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      background: "#eef2f7",
      minHeight: "100vh"
    }}>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >

        {columns.map(col => (
          <div
            key={col}
            id={col}
            style={{
              flex: 1,
              background: hoverColumn === col ? "#e3f2fd" : "#f8fafc",
              padding: "15px",
              borderRadius: "14px",
              boxShadow: hoverColumn === col
                ? "0 6px 18px rgba(0,0,0,0.15)"
                : "0 4px 10px rgba(0,0,0,0.08)",
              transition: "all 0.25s ease"
            }}
          >
            <h3 style={{
              textAlign: "center",
              marginBottom: "15px",
              fontWeight: "600",
              color: "#333"
            }}>
              {col.replace("_", " ")}
            </h3>

            <SortableContext
              items={groupedTasks[col].map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {groupedTasks[col].map(task => {
                const isActive = activeId === task.id;

                return (
                  <div
                    key={task.id}
                    style={{
                      background: isActive ? "#e3f2fd" : "white",
                      padding: "12px",
                      marginBottom: "12px",
                      borderRadius: "12px",
                      boxShadow: isActive
                        ? "0 10px 25px rgba(0,0,0,0.2)"
                        : "0 4px 12px rgba(0,0,0,0.1)",
                      transform: isActive
                        ? "scale(1.05) rotate(1deg)"
                        : "scale(1)",
                      transition: "all 0.25s ease",
                      cursor: "grab"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {task.title}
                  </div>
                );
              })}
            </SortableContext>

          </div>
        ))}

      </DndContext>
    </div>
  );
}

export default ProjectBoard;