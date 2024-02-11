import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import CredentialsRepoPage from "./components/CredentialsRepoPage";
import UserPage from "./components/UserPage";
import "./App.css";
import DivisionOU from "./components/DivisionsOU";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [divisionUsers, setDivisionUsers] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token); // Decodes the token stored in session storage to get the user ID.

      // The user email from the decoded token is used to fetch the user's info.
      const response = await axios.get(`/user/${decodedToken.email}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error: " + error.response.data);
    }
  };

  const fetchDivisionUsers = async () => {
    try {
      const response = await axios.get(`/credentials/${userInfo.division}`);
      setDivisionUsers(response.data);
    } catch (error) {
      console.error("Error fetching division users: " + error.response.data);
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
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/credentials"
          element={
            <CredentialsRepoPage
              userInfo={userInfo}
              fetchUserInfo={fetchUserInfo}
              divisionUsers={divisionUsers}
              fetchDivisionUsers={fetchDivisionUsers}
            />
          }
        />
        <Route
          path="/division"
          element={
            <DivisionOU userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
          }
        />
        <Route
          path="/user"
          element={
            <UserPage userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
