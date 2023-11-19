import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login";
import "./App.css";
import { Signup } from "./Components/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./Components/Navbar";

export class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            {/* home */}
            <Route exact path="/" element={<Navbar />} />
            {/* signup */}
            <Route path="/signup" element={<Signup />} />
            {/* login */}
            <Route path="/login" element={<Login />} />
            {/* cart products */}
            <Route path="/cartproducts" />
            {/* add products */}
            <Route path="/addproducts" />
            {/* cashout */}
            <Route path="/cashout" />
            {/*incorrect routes*/}
            <Route path="*" />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
