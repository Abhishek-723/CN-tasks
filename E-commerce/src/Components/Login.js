import { useState } from "react";
import "../App.css";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Config";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.error("Complete all fields");
    const { email, password } = formData;

    // Enhanced email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      //   setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem("id", user.uid);
      //   storeUserIdInLocalStorage(user.uid);
      //   setLoading(false);
      toast.success("Signed in successfully");
      navigate("/");
    } catch (error) {
      //   setLoading(false);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Error signing in");
      }
    }
    // setIsAuthenticated(true);
  };

  return (
    <div className="container">
      <br />
      <h2>Login</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email" // Add name attribute
          onChange={(e) => handleInputChange(e, "email")} // Add onChange function
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password" // Add name attribute
          onChange={(e) => handleInputChange(e, "password")} // Add onChange function
        />
        <br />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};
