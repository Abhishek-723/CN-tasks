import { useState } from "react";
import "./App.css";
import CreateTask from "./modals/CreateTask";
import TodoList from "./components/ToDoList";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Todo List App</h1>
        <button className="btns create-task" onClick={openModal}>
          Create Todo
        </button>
      </div>
      <CreateTask isOpen={isModalOpen} onRequestClose={closeModal} />
      <TodoList />
    </div>
  );
}

export default App;
