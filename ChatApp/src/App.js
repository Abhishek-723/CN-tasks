import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Specify the routes using the 'path' and 'element' props */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
