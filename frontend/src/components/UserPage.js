import { useEffect } from "react";

function UserPage(props) {
  const { userInfo, fetchUserInfo } = props;

  useEffect(() => {
    // Fetches the user info when the component mounts.
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      {userInfo ? (
        <div className="outer-div">
          <div className="inner-div">
            <img
              id="profile-pic"
              alt="profile pic"
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            />
            <div className="userInfo-container">
              <p>
                <label>Email</label>
                {userInfo.email}
              </p>
              <p>
                <label>Role</label>
                {userInfo.role}
              </p>
              <p>
                <label>Division</label>
                {userInfo.division}
              </p>
              <p>
                <label>Organisational unit</label>
                {userInfo.organisational_unit}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default UserPage;
