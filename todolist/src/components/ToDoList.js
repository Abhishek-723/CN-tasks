import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Card from "./Card";
import EditTask from "../modals/EditTask";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currTodo, setCurrTodo] = useState({});
  const [currIndex, setCurrIndex] = useState(0);
  //   const []
  let x = localStorage.getItem("todos");

  useEffect(() => {
    // Load todos from localStorage on component mount
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, [x]);

  const handleEditTodo = (index) => {
    setCurrIndex(index);
    setCurrTodo(todos[index]);
    setEditModal(true);
    // Implement edit functionality here
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);

    // Update localStorage and state after deleting
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const closeModal = () => {
    setEditModal(false);
  };

  return (
    <>
      <div className="task-container">
        {todos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <Card
              title={todo.title}
              description={todo.description}
              handleEdit={handleEditTodo}
              handleDelete={handleDeleteTodo}
              index={index}
            />
          </div>
        ))}
      </div>
      {editModal && (
        <EditTask
          index={currIndex}
          onRequestClose={closeModal}
          todo={currTodo}
        />
      )}
    </>
  );
};

export default TodoList;
