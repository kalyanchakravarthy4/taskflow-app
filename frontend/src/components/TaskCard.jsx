function TaskCard({ task }) {
  return (
    <div style={{
      background: "#fff",
      padding: "10px",
      margin: "5px 0",
      borderRadius: "6px"
    }}>
      <strong>{task.title}</strong>
      <p>Status: {task.status}</p>
    </div>
  );
}

export default TaskCard;