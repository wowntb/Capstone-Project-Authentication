import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Credentials from "./components/pages/Credentials";
import UserAdministration from "./components/pages/UserAdministration";
import DivisionOU from "./components/pages/DivisionOU";

function App() {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token); // Decodes the token stored in session storage to get the user ID.

      // The user email from the decoded token is used to fetch the user's info.
      const response = await axios.get(`/user/${decodedToken.username}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error: " + error.response.data);
    }
  };

  return (
    <BrowserRouter>
      <div id="site-header">
        <h1>Cool Tech</h1>
        <p>Capstone Project V: Authentication</p>
      </div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/credentials"
          element={
            <Credentials userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
          }
        />
        <Route
          path="/division-ou-management"
          element={
            <DivisionOU userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
          }
        />
        <Route
          path="/administration"
          element={
            <UserAdministration
              userInfo={userInfo}
              fetchUserInfo={fetchUserInfo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
