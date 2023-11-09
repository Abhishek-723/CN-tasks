import React, { useState } from "react";
import "./CreateTodoModal.css";

const EditTask = ({ onRequestClose, todo, index }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleEditTodo = () => {
    const todoData = {
      title,
      description,
    };

    // Get existing todos from localStorage
    const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Add the new todo to the list
    existingTodos[index] = todoData;

    // Store updated todos in localStorage
    localStorage.setItem("todos", JSON.stringify(existingTodos));
    onRequestClose();
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <div className={`modal-container open`}>
      <div className="modal-content">
        <h2>Edit Todo</h2>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={handleTitleChange} />
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
          <button onClick={handleEditTodo} className="create">
            Edit
          </button>
          <button onClick={onRequestClose} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
