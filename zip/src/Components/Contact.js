import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContact } from "../reducer/actions";

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts);
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };
  const handleEdit = (contact) => {
    navigate(`/edit/${contact.id}`);
  };
  return (
    <div className="contact-container">
      <div className="header">
        <h2>Contact List</h2>
        <button className="add-button" onClick={() => navigate("/add")}>
          Add Contact
        </button>
      </div>
      <div className="contact-list">
        <div className="contact-item header">
          <div>ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Action</div>
        </div>
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <div>{contact.id}</div>
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
            <div>
              <button
                className="edit-button"
                onClick={() => handleEdit(contact)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
