import { useState, useEffect } from "react";
import axios from "axios";

// Renders a component that loads and displays credentials for a specific organisational unit (OU).
function OrganisationalUnitLoader(props) {
  const { OU, userInfo, fetchUserInfo } = props;
  const [credentials, setCredentials] = useState([]);
  const [selectedCredentials, setSelectedCredentials] = useState(null);
  const [editingCredentials, setEditingCredentials] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const handleInputChange = (event, field) => {
    setEditingCredentials({
      ...editingCredentials,
      [field]: event.target.value,
    });
  };

  const handleEdit = (credential) => {
    if (
      userInfo &&
      (userInfo.role === "admin" || userInfo.role === "manager")
    ) {
      setSelectedCredentials(credential._id);
      setEditingCredentials({ ...credential });
    } else {
      alert("Access denied. Only admins/managers can edit credentials.");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `/credentials/update/${editingCredentials._id}`,
        editingCredentials
      );
      setEditingCredentials({});
      setSelectedCredentials(null);
      fetchCredentials();
    } catch (error) {
      console.error("Update credentials error: " + error.response.data);
      alert("Update credentials failed: " + error.response.data.message);
    }
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setEditingCredentials({});
  };

  const handleSaveAdd = async () => {
    try {
      // The OU is set to the OU of the component.
      editingCredentials.ou = OU;
      await axios.post(`/credentials/add/${OU}`, editingCredentials);
      setEditingCredentials({});
      setShowAddForm(false);
      fetchCredentials();
    } catch (error) {
      console.error("Create credentials error: " + error.response.data);
      alert("Create credentials failed: " + error.response.data.message);
    }
  };

  const fetchCredentials = async () => {
    // This fetch credentials function retrieves all credentials first.
    if (userInfo && userInfo.ou_access && userInfo.division_access) {
      try {
        const response = await axios.get(`/credentials/${OU}`);
        // Then it filters the credentials based on the user's role and OU access.
        const allowedCredentials = response.data.filter((credential) => {
          if (userInfo.role === "admin" || userInfo.role === "manager") {
            return true;
          } else if (
            // If the user is a normal user then each credential is checked to see if the OU is in the user's OU access list.
            userInfo.ou_access.some(
              // The OU access list is compared to the OU of the credential in a case-insensitive manner.
              (access) => access.toLowerCase() === credential.ou.toLowerCase()
            )
          ) {
            return true;
          } else {
            return false;
          }
        });
        setCredentials(allowedCredentials);
      } catch (error) {
        console.error("Fetch credentials error: " + error.response.data);
        alert("Fetch credentials failed: " + error.response.data.message);
      }
    } else {
      console.log("User info not available yet.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchCredentials();
  }, [userInfo]);

  return (
    <>
      <h3>{OU} Credentials</h3>
      {credentials && userInfo ? (
        <div>
          {credentials.map((credential, index) => (
            <div className="credentials-container" key={index}>
              {selectedCredentials === credential._id ? (
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
                    <label htmlFor="organisational-unit">
                      Organisational Unit
                    </label>
                    <input
                      id="organisational-unit"
                      type="text"
                      value={editingCredentials.ou}
                      onChange={(event) => handleInputChange(event, "ou")}
                    />
                  </p>

                  <p>
                    <label htmlFor="division">Division</label>
                    <input
                      id="division"
                      type="number"
                      value={editingCredentials.division}
                      onChange={(event) => handleInputChange(event, "division")}
                      max={10}
                      min={1}
                    />
                  </p>

                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div>
                  <p>
                    <label>Credentials Name</label>
                    {credential.name}
                  </p>

                  <p>
                    <label>Username</label>
                    {credential.username}
                  </p>

                  <p>
                    <label>Password</label>
                    {userInfo &&
                    (userInfo.role === "admin" ||
                      userInfo.role === "manager") ? (
                      <>{credential.password}</>
                    ) : (
                      <>[Requires admin/manager]</>
                    )}
                  </p>

                  <p>
                    <label>Division</label>
                    {credential.division}
                  </p>

                  <button onClick={() => handleEdit(credential)}>Edit</button>
                </div>
              )}
            </div>
          ))}
          {/* The add button is only rendered if the user has access to the OU. */}
          {!showAddForm &&
            userInfo.ou_access &&
            userInfo.ou_access.includes(OU) && (
              <button onClick={handleAdd}>Add</button>
            )}
          {showAddForm && (
            <div className="credentials-container">
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
                    type="number"
                    value={editingCredentials.division}
                    onChange={(event) => handleInputChange(event, "division")}
                    max={10}
                    min={1}
                  />
                </p>

                <p>
                  <label htmlFor="ou">OU</label>
                  {OU}
                </p>

                <button onClick={handleSaveAdd}>Save</button>
                <button onClick={handleCancelAdd}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default OrganisationalUnitLoader;
