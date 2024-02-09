import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import CredentialsPage from "./components/CredentialsPage";
import UserPage from "./components/UserPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <h1>Cool Tech</h1>
      <p>Capstone Project V: Authentication</p>
      <NavigationBar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
