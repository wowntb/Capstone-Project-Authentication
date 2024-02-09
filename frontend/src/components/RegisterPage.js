import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    // This is data that can be used to test the registration form.
    username: "jonbonejones",
    email: "jonjones@ufc.com",
    password: "bonebreaker",
  });

  const checkTokenValidity = () => {
    // This method checks if the token is present and valid.
    const token = localStorage.getItem("token"); // This token variable retrieves the token from the local storage.

    // If the token is present, check if it's expired.
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // The token is expired if exp is less than the current time. User will be redirected to the login page.
        navigate("/login");
      } else {
        // The token is valid so the user is redirected to the user page for their basic info.
        navigate("/user");
        alert("You are already registered and logged in.");
      }
    }
  };

  useEffect(() => {
    // The token is checked when the component mounts.
    checkTokenValidity();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", registerData);
      alert("Registration successful. Please login.");
      console.log("Registration success:", response.data);
      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response.data);
      alert("Registration failed: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={registerData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
