import React, { useState } from "react";
import "./CreateTodoModal.css";

const CreateTask = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = () => {
    const todoData = {
      title,
      description,
    };

    // Get existing todos from localStorage
    const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Add the new todo to the list
    existingTodos.push(todoData);

    // Store updated todos in localStorage
    localStorage.setItem("todos", JSON.stringify(existingTodos));
    onRequestClose();
  };
  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Create Todo</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleCreateTodo} className="create">
            Create
          </button>
          <button onClick={onRequestClose} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
