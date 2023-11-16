import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar";
import Signin from "./signin/signin";
import Details from "./components/details";
import ProtectedRoutes from "./protectedroutes/protectedroutes";
import Resume from "./components/resume";
import Signup from "./signup/signup";

function App() {
  // Use the useSelector hook to get the loading state from the Redux store
  const loading = useSelector((state) => state.loading.loading);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Details />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoutes>
                <Resume />
              </ProtectedRoutes>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
