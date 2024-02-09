import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    // This is data that can be used to test the login form.
    email: "jonjones@ufc.com",
    password: "bonebreaker",
  });

  const navigate = useNavigate();

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        navigate("/login");
      } else {
        alert("You are already logged in.");
        navigate("/user");
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", loginData);
      const token = response.data.token;

      // Store the token in the local storage
      localStorage.setItem("token", token);

      // The user will be alerted with a message if the login is successful.
      alert("Login successful!");
      console.log(localStorage.getItem("token"));

      // Redirect to a new page after successful login. The page shows the user's info.
      navigate("/user");
    } catch (error) {
      alert("Login failed. Please try again. Error: " + error.response.data);
      console.error("Login error: " + error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
