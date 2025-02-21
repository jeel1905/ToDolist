import React, { useState } from "react";

function Todolist() {
  const [tasks, setTasks] = useState([
    { text: "eat", completed: false },
    { text: "shower", completed: false },
    { text: "walk", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
          updatedTasks[index - 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      });
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
          updatedTasks[index + 1],
          updatedTasks[index],
        ];
        return updatedTasks;
      });
    }
  }

  // function toggleTaskCompletion(index) {
  //   setTasks((prevTasks) => {
  //     const updatedTasks = [...prevTasks];
  //     updatedTasks[index].completed = !updatedTasks[index].completed;
  //     return updatedTasks;
  //   });
  // }
  function toggleTaskCompletion(index) {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }
  

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="addtask" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              🗑️
            </button>
            <button className="move-btn" onClick={() => moveTaskUp(index)}>
              ⬆️
            </button>
            <button className="move-btn" onClick={() => moveTaskDown(index)}>
              ⬇️
            </button>
            <button className="done-btn" onClick={() => toggleTaskCompletion(index)}>
              ✅
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Todolist;
