"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        debugger;
        setTasks(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const addTask = () => {
    fetch("http://localhost:3001/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const editTask = (id: string) => {
    fetch(`http://localhost:3001/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: true, completedOn: new Date() }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        fetchTasks();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task: any) => (
          <li key={task._id}>
            <span onClick={() => editTask(task._id)}>
              <span>{task._id}</span> | 
              {task.title} - {task.completed ? "Done" : "Pending"}
              <div>Completed on:{task.completedOn}</div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
