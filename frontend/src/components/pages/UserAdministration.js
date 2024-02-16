import React, { useEffect, useState } from "react";
import axios from "axios";

function UserAdministration(props) {
  const { userInfo, fetchUserInfo } = props;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState({});

  const handleInputChange = (event, field) => {
    // Handles the input change event.
    // Updates the editingUser state with the new value of the input field.
    setEditingUser({
      ...editingUser,
      [field]: event.target.value,
    });
  };

  const handleEdit = (user) => {
    // Handles the edit action.

    // Only admins can add/edit users.
    if (userInfo.role !== "admin") {
      alert("Access denied. Only admins can add/edit users.");
    } else {
      // Sets the selectedUser state and the editingUser state to the user being edited.
      setSelectedUser(user._id);
      setEditingUser({ ...user });
    }
  };

  const handleSave = async () => {
    // Handles the save action for editing user details.
    try {
      // Check if editingUser.ou_access is a string before attempting to split
      if (typeof editingUser.ou_access === "string") {
        // Splits the OU access string into an array
        editingUser.ou_access = editingUser.ou_access.split(",");
      }

      // Check if editingUser.division_access is a string before attempting to split
      if (typeof editingUser.division_access === "string") {
        // Splits the division access string into an array
        editingUser.division_access = editingUser.division_access.split(",");
      }

      // Sends a PUT request using the editingUser state to update the user details.
      await axios.put(`/user/${editingUser._id}`, editingUser);

      // Clears the editingUser state and resets the selectedUser state.
      setEditingUser({});
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Update user error: " + error.response.data);
      alert("Update user failed: " + error.response.data.message);
    }
  };

  const fetchUsers = async () => {
    try {
      // Sends a GET request to fetch the users on the database.
      const response = await axios.get("/users");

      // Sets the user state with the fetched user details.
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch user error: " + error.response.data);
      alert("Fetch user failed: " + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchUsers();

    if (userInfo.role && userInfo.role !== "admin") {
      alert("Only admins can access this page!");
      window.location.href = "/credentials";
    }
  }, [userInfo]);

  return (
    <div className="outer-div">
      <h2>User Administration</h2>
      <div className="inner-div">
        {users.map((user, index) => (
          <div className="credentials-container" key={index}>
            {selectedUser === user._id ? (
              <div>
                <p>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={editingUser.username}
                    onChange={(event) => handleInputChange(event, "username")}
                  />
                </p>

                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="text"
                    value={editingUser.password}
                    onChange={(event) => handleInputChange(event, "password")}
                  />
                </p>

                <p>
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    value={editingUser.role}
                    onChange={(event) => handleInputChange(event, "role")}
                  >
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                </p>

                <p>
                  <label htmlFor="ou-access">OU Access</label>
                  <input
                    id="ou-access"
                    type="text"
                    value={editingUser.ou_access}
                    onChange={(event) => handleInputChange(event, "ou_access")}
                  />
                </p>

                <p>
                  <label htmlFor="division-access">Division Access</label>
                  <input
                    id="division-access"
                    type="text"
                    value={editingUser.division_access}
                    onChange={(event) =>
                      handleInputChange(event, "division_access")
                    }
                  />
                </p>

                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                <p>
                  <label>Username</label>
                  {user.username}
                </p>

                <p>
                  <label>Password</label>
                  {user.password}
                </p>

                <p>
                  <label>Role</label>
                  {user.role}
                </p>

                <p>
                  <label>OU Access</label>
                  {user.ou_access.join(", ")}
                </p>

                <p>
                  <label>Division Access</label>
                  {user.division_access.join(", ")}
                </p>

                <button onClick={() => handleEdit(user)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAdministration;
