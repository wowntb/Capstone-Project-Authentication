import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    // This is data that can be used to test the login form.
    username: "jonbonejones",
    password: "bonebreaker",
  });
  const navigate = useNavigate();

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

      // Store the token in the session storage.
      sessionStorage.setItem("token", token);
      // The user will be alerted with a message if the login is successful.
      alert("Login successful!");
      // Redirect to a new page after successful login. The page shows the user's info.
      navigate("/credentials");
    } catch (error) {
      alert("Login failed. Please try again. Error: " + error.response.data);
      console.error("Login error: " + error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="outer-div">
        <div className="inner-div">
          <div className="credentials-container">
            <form onSubmit={handleLogin}>
              <div>
                <p>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={loginData.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </p>

                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                </p>
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
