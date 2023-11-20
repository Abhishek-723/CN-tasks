import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addContact } from "../reducer/actions";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [contact, setContact] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    setContact({
      ...contact,
      id: contacts.length,
    });
  }, [contacts]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };
  const isDuplicate = (property, value) => {
    return contacts.some((contact) => contact[property] === value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = contact;
    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      toast.error("Please fill out all the fields");
      return;
    }
    if (isDuplicate("email", email) || isDuplicate("phone", phone)) {
      toast.error("Duplicate phone or email found");
      return;
    }
    dispatch(addContact(contact));
    navigate("/");
  };
  return (
    <div>
      <div className="add-contact-container">
        <form className="add-contact-form" onSubmit={handleSubmit}>
          <h2>Add Contact</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" onChange={handleChange} />
          </div>
          <button type="submit" className="add-button">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
