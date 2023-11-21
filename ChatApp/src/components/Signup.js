import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import {
  uploadString,
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
} from "firebase/storage";
import { db } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Upload profile photo to Firebase Storage
      //   console.log("YES");
      const storageRef = ref(storage, `profilePhotos/${user.uid}.jpg`);
      console.log("YES");
      const metadata = { contentType: "image/jpeg" };

      // Convert the base64 data URL to a Uint8Array
      //   const base64Data = profilePhoto.split(",")[1];
      const buffer = new Uint8Array(
        atob(profilePhoto.split(",")[1])
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      //   const uint8Array = new Uint8Array(buffer);

      // Upload the Uint8Array to Firebase Storage
      await uploadBytes(storageRef, buffer, metadata);

      // Get the download URL of the uploaded photo
      const photoURL = await getDownloadURL(storageRef);
      console.log(photoURL);

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
        photoURL,
      });

      // You can redirect the user to another page after successful signup
      console.log("User signed up successfully!", user);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="formContainer">
      <h1 className="logo">Time Pass</h1>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="formWrapper">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Profile Photo:
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        {profilePhoto && (
          <img
            src={profilePhoto}
            alt="Profile Preview"
            style={{ maxWidth: "100px", marginTop: "10px" }}
          />
        )}
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
