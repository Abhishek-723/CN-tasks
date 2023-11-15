import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Details from "./components/details";
import { useContext } from "react";
// import { LoadingContext } from "./contexts/loadingContext";
import { BallTriangle } from "react-loader-spinner";
import Navbar from "./components/navbar";
import Signin from "./signin/signin";
import Signup from "./signup/signup";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./protectedroutes/protectedroutes";
import Resume from "./components/resume";

function App() {
  //   const { loading, setLoading } = useContext(LoadingContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        {/* {loading ? (
          <div className="loading-overlay">
            <BallTriangle color="maroon" height={100} width={100} />
          </div>
        ) : (
          <ToastContainer />
        )} */}
        <Routes>
          {/* Specify the routes using the 'path' and 'element' props */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/details" element={<Details />} />
          <Route
            path="/resume"
            element={
              <ProtectedRoutes>
                <Resume />
              </ProtectedRoutes>
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
