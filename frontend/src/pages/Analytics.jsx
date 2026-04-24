import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

function Analytics() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("/tasks", {
        headers: { Authorization: "Bearer " + token }
      });

      const counts = {
        TODO: 0,
        IN_PROGRESS: 0,
        DONE: 0
      };

      res.data.forEach(t => counts[t.status]++);

      setData([
        { name: "TODO", value: counts.TODO },
        { name: "IN_PROGRESS", value: counts.IN_PROGRESS },
        { name: "DONE", value: counts.DONE }
      ]);
    };

    if (token) fetchTasks();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Task Analytics</h2>

      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}

export default Analytics;