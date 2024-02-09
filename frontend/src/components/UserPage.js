import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function UserPage() {
  const [userInfo, setUserInfo] = useState(null);

  // Fetches user information from the server.
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token); // Decodes the token stored in local storage to get the user ID.

    try {
      // The user ID from the decoded token is used to fetch the user info.
      const response = await axios.get(`/user/${decodedToken.userId}`);
      const user = response.data;

      // Set the user info in the state.
      setUserInfo(user);
    } catch (error) {
      console.error("Error: " + error.response.data);
    }
  };

  // The user's info is fetched when the component mounts.
  useEffect(() => {
    fetchUserInfo();
  });

  return (
    <div>
      <h2>UserPage</h2>
      {userInfo ? (
        <div className="outer-div">
          <div className="inner-div">
            <img
              id="profile-pic"
              alt="profile pic"
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            />
            <p>Welcome, {userInfo.username}!</p>
            <p>Email: {userInfo.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default UserPage;
