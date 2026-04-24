import { useState } from "react";

function TaskModal({ onSave }) {

  const [title, setTitle] = useState("");

  return (
    <div>
      <input
        placeholder="Task title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => onSave(title)}>Save</button>
    </div>
  );
}

export default TaskModal;