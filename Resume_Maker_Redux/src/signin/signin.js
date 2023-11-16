import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config_db/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../redux/authSlice";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type]: e.target.value,
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
      navigate("/details");
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
    dispatch(authenticate.login());
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="Signintext">Sign In</h2>

        <input
          type="email"
          id="email"
          placeholder="Enter your email here"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Enter your password here"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signin;
