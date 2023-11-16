import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../config_db/firebase";
import { doc, setDoc } from "@firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    // Update the state based on the input field's name
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const { firstName, lastName, email, password, dob, gender } = formData;

    // Validation for empty fields
    if (!firstName || !lastName || !email || !password || !dob || !gender) {
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
      console.log(userCredential.user);
      const user = userCredential.user;

      // Update the user's profile (name in this case)
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      const userDocRef = doc(db, "users", user.uid); // "users" is the collection name
      await setDoc(
        userDocRef,
        { dob, gender, displayName: `${firstName} ${lastName}`, email },
        { merge: true }
      );

      //   setLoading(false);
      toast.success("User registered successfully");

      // Navigate to the Sign-in page
      navigate("/signin");
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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="Signuptext">Sign Up</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
