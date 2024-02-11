import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    // This is data that can be used to test the registration form.
    username: "jonbonejones",
    email: "jonjones@ufc.com",
    password: "bonebreaker",
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
      await axios.post("/register", registerData);
      alert("Registration successful. Please login.");
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
      <div className="outer-div">
        <div className="inner-div">
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
      </div>
    </div>
  );
}

export default RegisterPage;
