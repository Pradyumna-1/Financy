import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";

import Dashboard from "./components/Dashboard";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupSignin from "./components/Signup";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignupSignin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
