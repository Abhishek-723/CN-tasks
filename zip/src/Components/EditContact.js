import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addContact, editContact } from "../reducer/actions";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [contact, setContact] = useState({
    id: id,
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    const curr = contacts.find((c) => {
      c.id == id;
      if (c.id === id) console.log("True");
      console.log(c);
    });
    if (curr) {
      console.log(curr);
      setContact(curr);
    }
  }, [contacts, id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = contact;
    if (name.length === 0 || email.length === 0 || phone.length === 0) {
      toast.error("Please fill out all the fields");
      return;
    }
    // if (isDuplicate("email", email) || isDuplicate("phone", phone)) {
    //   toast.error("Duplicate phone or email found");
    //   return;
    // }
    dispatch(editContact(contact));
    navigate("/");
  };
  console.log(contact);
  return (
    <div>
      <div className="add-contact-container">
        <form className="add-contact-form" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={contact.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={contact.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={contact.phone}
            />
          </div>
          <button type="submit" className="add-button">
            Edit Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
