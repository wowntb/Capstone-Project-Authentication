import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    // This is data that can be used to test the registration form.
    username: "jonbonejones",
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

  useEffect(() => {
    // Clear the session storage when the component mounts.
    // This is to ensure that the user is logged out when they visit the registration page.
    sessionStorage.clear();
  }, []);

  return (
    <div>
      <h2>Register</h2>
      <div className="outer-div">
        <div className="inner-div">
          <div className="credentials-container">
            <form onSubmit={handleRegister}>
              <div>
                <p>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </p>

                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </p>
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
