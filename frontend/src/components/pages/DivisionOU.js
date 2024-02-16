import React, { useEffect, useState } from "react";
import axios from "axios";

function DivisionOU(props) {
  const { userInfo, fetchUserInfo } = props;
  const [credentials, setCredentials] = useState([]);
  const [selectedCredentials, setSelectedCredentials] = useState(null);
  const [editingCredentials, setEditingCredentials] = useState({});

  const handleInputChange = (event, field) => {
    // Handles the input change event.
    // Updates the editingUser state with the new value of the input field.
    setEditingCredentials({
      ...editingCredentials,
      [field]: event.target.value,
    });
  };

  const handleEdit = (credential) => {
    // Handles the edit action for a user.
    // Only admins/managers can edit credentials.
    if (userInfo.role !== "admin" && userInfo.role !== "manager") {
      alert("Access denied. Only admins/managers can edit credentials.");
    } else {
      // Sets the selectedUser state and the editingUser state to the user being edited.
      setSelectedCredentials(credential._id);
      setEditingCredentials({ ...credential });
    }
  };

  const handleSave = async () => {
    // Handles the save action for editing user credentials.
    try {
      // Sends a PUT request using the editingUser state to update the user credentials.
      await axios.put(
        `/credentials/update/${editingCredentials._id}`,
        editingCredentials
      );

      // Clears the editingUser state and resets the selectedUser state.
      setEditingCredentials({});
      setSelectedCredentials(null);
      fetchCredentials();
    } catch (error) {
      console.error("Update credentials error: " + error.response.data);
      alert("Update credentials failed: " + error.response.data.message);
    }
  };

  const fetchCredentials = async () => {
    try {
      // Sends a GET request to fetch the credentials of the OU from the props.
      const response = await axios.get("/credentials");

      // Sets the credentials state with the fetched credentials.
      setCredentials(response.data);
    } catch (error) {
      console.error("Fetch credentials error: " + error.response.data);
      alert("Fetch credentials failed: " + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchCredentials();
  }, [userInfo]);

  return (
    <div className="outer-div">
      <h2>Division & OU Management</h2>
      <div className="inner-div">
        <h3> All Credentials</h3>
        <div>
          {credentials.map((credentials, index) => (
            <div className="credentials-container" key={index}>
              {selectedCredentials === credentials._id ? (
                <div>
                  <p>
                    <label htmlFor="name">Credentials Name</label>
                    <input
                      id="name"
                      type="text"
                      value={editingCredentials.name}
                      onChange={(event) => handleInputChange(event, "name")}
                    />
                  </p>

                  <p>
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      value={editingCredentials.username}
                      onChange={(event) => handleInputChange(event, "username")}
                    />
                  </p>

                  <p>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="text"
                      value={editingCredentials.password}
                      onChange={(event) => handleInputChange(event, "password")}
                    />
                  </p>

                  <p>
                    <label htmlFor="division">Division</label>
                    <input
                      id="division"
                      type="text"
                      value={editingCredentials.division}
                      onChange={(event) => handleInputChange(event, "division")}
                    />
                  </p>

                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div>
                  <p>
                    <label>Credentials Name</label>
                    {credentials.name}
                  </p>

                  <p>
                    <label>Organisational Unit</label>
                    {credentials.username}
                  </p>

                  <p>
                    <label>Username</label>
                    {credentials.username}
                  </p>

                  <p>
                    <label>Password</label>
                    {userInfo.role === "admin" ||
                    userInfo.role === "manager" ? (
                      <>{credentials.password}</>
                    ) : (
                      <>[Requires admin/manager]</>
                    )}
                  </p>

                  <button onClick={() => handleEdit(credentials)}>Edit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DivisionOU;
