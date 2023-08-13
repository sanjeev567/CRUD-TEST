import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./components/register/Registration";
import Login from "./components/login/Login";
import Features from "./components/features/Features";
import FileUpload from "./components/fileUpload/FileUpload";
const App = () => {
  const [redirect, setRedirect] = useState(false);

  const handleRedirect = () => {
    setRedirect(true);
    console.log(redirect);
  };

  return (
    <div className="app">
      {/* <Router>
        <Routes>
          <Route
            path="/"
            element={redirect ? <Features /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleRedirect} />} />
        </Routes>
      </Router> */}
      <FileUpload />
    </div>
  );
};

export default App;
