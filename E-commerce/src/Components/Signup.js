import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../Config/Config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;

    // Validation for empty fields
    if (!name || !email || !password) {
      toast.error("Complete all fields");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    // Validate email format using a simple regex (this is basic and can be enhanced)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      // Create the user with email and password
      //   setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   console.log(userCredential.user);
      const user = userCredential.user;

      // Update the user's profile (name in this case)
      await updateProfile(user, { displayName: `${name}` });

      const userDocRef = doc(db, "users", user.uid); // "users" is the collection name
      await setDoc(
        userDocRef,
        { displayName: `${name}`, email },
        { merge: true }
      );

      //   setLoading(false);
      toast.success("User registered successfully");

      // Navigate to the Sign-in page
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use");
      } else {
        // Handle other errors (for brevity, we'll show a generic message here)
        console.log("Error: ", error);
        toast.error("Error registering user");
      }
      //   setLoading(false);
    }
  };

  return (
    <div className="container">
      <br />
      <h2>Sign up</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};
