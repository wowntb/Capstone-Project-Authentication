import { useEffect, useState } from "react";
import axios from "axios";

function CredentialsRepoPage(props) {
  const { userInfo, fetchUserInfo, divisionUsers, fetchDivisionUsers } = props;
  const [editingUser, setEditingUser] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({});

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
    // Only admins/managers can edit credentials.
    if (userInfo.role !== "admin" || user.role !== "manager") {
      alert("Access denied. Only admins/managers can edit credentials.");
    } else if (userInfo.role === "admin" || userInfo.role === "manager") {
      // Sets the selectedUser state and the editingUser state to the user being edited.
      setSelectedUser(user._id);
      setEditingUser({ ...user });
    }
  };

  const handleSave = async () => {
    // Handles the save action for editing user credentials.
    try {
      // Sends a PUT request using the editingUser state to update the user credentials.
      await axios.put(`/update/${editingUser._id}`, editingUser);

      // Clears the editingUser state and resets the selectedUser state.
      setEditingUser({});
      setSelectedUser(null);
      // Fetches the user info again to update the user's division and trigger the effect that is dependent on userInfo.
      fetchUserInfo();
    } catch (error) {
      console.error("Update credentials error: " + error.response.data);
      alert("Update credentials failed: " + error.response.data.message);
    }
  };

  const handleAddUser = () => {
    // Handles the add user action.
    setAddingUser(true); // Set addingUser state to true to show the add user form.
  };

  const handleCreateUser = async () => {
    // Handles the create user action.
    try {
      // Sends a POST request using the newUser state to create a new user.
      await axios.post("/register", newUser);
      alert("User created successfully!");

      // Clears the newUser state and resets the addingUser state.
      setNewUser({});
      setAddingUser(false);
      // Fetches the user info again to update the user's division and trigger the effect that is dependent on userInfo.
      fetchUserInfo();
    } catch (error) {
      console.error("Create user error: " + error.response.data);
      alert("Create user failed: " + error.response.data.message);
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
                      {/* This condition only allows admins/managers to see the division's passwords. */}
                      {user.role === "admin" || user.role === "manager" ? (
                        <p>
                          <label>Password</label>
                          {user.password}
                        </p>
                      ) : (
                        <p>
                          <label>Password</label>[Requires admin/manager]
                        </p>
                      )}

                      <button onClick={() => handleEdit(user)}>Edit</button>
                    </div>
                  )}
                </div>
              ))}
              {addingUser ? (
                <div className="userInfo-container">
                  <p>
                    <label htmlFor="newUsername">Username</label>
                    <input
                      type="text"
                      id="newUsername"
                      value={newUser.username}
                      onChange={(event) =>
                        setNewUser({ ...newUser, username: event.target.value })
                      }
                    />
                  </p>

                  <p>
                    <label htmlFor="newEmail">Email</label>
                    <input
                      type="text"
                      id="newEmail"
                      value={newUser.email}
                      onChange={(event) =>
                        setNewUser({ ...newUser, email: event.target.value })
                      }
                    />
                  </p>

                  <p>
                    <label htmlFor="newPassword">Password</label>
                    <input
                      type="text"
                      id="newPassword"
                      value={newUser.password}
                      onChange={(event) =>
                        setNewUser({ ...newUser, password: event.target.value })
                      }
                    />
                  </p>

                  <button onClick={handleCreateUser}>Create</button>
                </div>
              ) : (
                <button onClick={handleAddUser}>Add credentials</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CredentialsRepoPage;
