import { useState, useEffect } from "react";
import axios from "axios";

function DivisionOU(props) {
  const { userInfo, fetchUserInfo } = props;
  const [allUsers, setAllUsers] = useState([]);
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
    } else {
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
    } catch (error) {
      console.error("Update credentials error: " + error.response.data);
      alert("Update credentials failed: " + error.response.data.message);
    }
  };

  useEffect(() => {
    // userInfo is fetched when the component mounts to see if the user has the admin role.
    fetchUserInfo();
  }, []);

  useEffect(() => {
    // Fetches all users when the userInfo state is updated.
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("/users");
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching all users: " + error.response.data);
      }
    };

    fetchAllUsers();
  }, [selectedUser]);

  return (
    <>
      <h2>Division & Organisational Unit Management</h2>
      {allUsers.length > 0 ? (
        <div className="outer-div">
          <div className="inner-div">
            <h3>All Users</h3>
            {/* The allUsers state contains an array which is mapped here to show all the users in the database. */}
            {allUsers.map((user, index) => (
              <div className="user-box" key={index}>
                {selectedUser === user._id ? (
                  <div className="userInfo-container">
                    <p>
                      <label>Username</label>
                      {user.username}
                    </p>

                    <p>
                      <label htmlFor="role">Role</label>
                      <select
                        id="role"
                        value={editingUser.role}
                        onChange={(event) => handleInputChange(event, "role")}
                      >
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </select>
                    </p>

                    <p>
                      <label htmlFor="division">Division</label>
                      <input
                        type="number"
                        value={editingUser.division}
                        onChange={(event) =>
                          handleInputChange(event, "division")
                        }
                        // The division number must be between 1 and 10.
                        min={1}
                        max={10}
                      />
                    </p>

                    <p>
                      <label htmlFor="ou">Organisational unit</label>
                      {/* A selection of OUs is provided so that the user doesn't have to type it and risk entering an invalid OU. */}
                      <select
                        id="ou"
                        value={editingUser.organisational_unit}
                        onChange={(event) =>
                          handleInputChange(event, "organisational_unit")
                        }
                      >
                        <option value="unassigned">unassigned</option>
                        <option value="News management">News management</option>
                        <option value="Software reviews">
                          Software reviews
                        </option>
                        <option value="Hardware reviews">
                          Hardware reviews
                        </option>
                        <option value="Opinion publishing">
                          Opinion publishing
                        </option>
                      </select>
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
                      <label>Role</label>
                      {user.role}
                    </p>
                    <p>
                      <label>Division</label>
                      {user.division}
                    </p>
                    <p>
                      <label>Organisational unit</label>
                      {user.organisational_unit}
                    </p>

                    <button onClick={() => handleEdit(user)}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p> // Show a loading indicator
      )}
    </>
  );
}

export default DivisionOU;
