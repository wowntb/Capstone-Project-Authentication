import { useEffect, useState } from "react";
import axios from "axios";

function CredentialsRepoPage(props) {
  const { userInfo, fetchUserInfo, divisionUsers, fetchDivisionUsers } = props;
  const [editingUser, setEditingUser] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInputChange = (event, field) => {
    // Handles the input change event.
    // Updates the editingUser state with the new value of the input field.
    setEditingUser({
      ...editingUser,
      [field]: event.target.value,
    });
  };

  const handleEdit = (user) => {
    // Handles the edit action for a user.
    // Only admins can edit credentials.
    if (userInfo.role !== "admin") {
      alert("Access denied. Only admins can edit credentials.");
    } else if (userInfo.role === "admin") {
      // Sets the selectedUser state and the editingUser state to the user being edited.
      setSelectedUser(user._id);
      setEditingUser({ ...user });
    }
  };

  const handleSave = async () => {
    // Handles the save action for editing user credentials.
    try {
      // Sends a PUT request ussing the editingUser state to update the user credentials.
      await axios.put(`/update/${editingUser._id}`, editingUser);

      // Clears the editingUser state and resets the selectedUser state.
      setEditingUser({});
      setSelectedUser(null);
      // Fetches the user info again to update the user's division and trigger the effect that is dependent on userInfo
      fetchUserInfo();
    } catch (error) {
      console.error("Update credentials error: " + error.response.data);
      alert("Update credentials failed: " + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.division !== undefined) {
      fetchDivisionUsers();
    }
  }, [userInfo]);

  return (
    <>
      <h2>Credentials</h2>
      {divisionUsers.length > 0 ? (
        <div className="outer-div">
          <div className="inner-div">
            <h3>Division {userInfo.division} Credentials</h3>
            <div>
              {/* The users in the divisionUsers state are mapped to show their details. */}
              {divisionUsers.map((user, index) => (
                <div className="user-box" key={index}>
                  {/* If the user is selected, the form to edit the user's credentials is shown. */}
                  {selectedUser === user._id ? (
                    <div className="userInfo-container">
                      <p>
                        <label htmlFor="username">Username:</label>
                        <input
                          type="text"
                          id="username"
                          value={editingUser.username}
                          onChange={(event) =>
                            handleInputChange(event, "username")
                          }
                        />
                      </p>

                      <p>
                        <label htmlFor="email">Email:</label>
                        <input
                          type="text"
                          id="email"
                          value={editingUser.email}
                          onChange={(event) =>
                            handleInputChange(event, "email")
                          }
                        />
                      </p>

                      <p>
                        <label htmlFor="password">Password:</label>
                        <input
                          type="text"
                          id="password"
                          value={editingUser.password}
                          onChange={(event) =>
                            handleInputChange(event, "password")
                          }
                        />
                      </p>

                      <button onClick={handleSave}>Save</button>
                    </div>
                  ) : (
                    <div className="userInfo-container">
                      <p>
                        <label>Username</label>
                        {user.username}
                      </p>
                      <p>
                        <label>Email</label>
                        {user.email}
                      </p>
                      {/* This condition only allows admins to see the division's passwords. */}
                      {user.role === "admin" ? (
                        <p>
                          <label>Password</label>
                          {user.password}
                        </p>
                      ) : (
                        <p>
                          <label>Password</label>[Requires admin]
                        </p>
                      )}

                      <button onClick={() => handleEdit(user)}>Edit</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Show a loading indicator
      )}
    </>
  );
}

export default CredentialsRepoPage;
