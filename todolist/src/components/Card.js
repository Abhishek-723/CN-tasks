import React from "react";

const Card = ({ title, description, handleEdit, handleDelete, index }) => {
  return (
    <div>
      <p className="todo-title">{title}</p>
      <p className="todo-desc">{description}</p>
      <div className="button-container">
        <i onClick={() => handleEdit(index)} className="far fa-edit"></i>
        <i onClick={() => handleDelete(index)} className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default Card;
