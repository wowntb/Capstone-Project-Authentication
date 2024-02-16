import { useEffect } from "react";
import OrganisationalUnitLoader from "../OrganisationalUnitLoader";

function Credentials({ userInfo, fetchUserInfo }) {
  useEffect(() => {
    // userInfo is fetched when the component mounts to see if the user has the admin/manager role.
    fetchUserInfo();
  }, []);

  return (
    <div className="outer-div">
      <h2>Credentials</h2>

      <div className="inner-div">
        <OrganisationalUnitLoader
          OU="News Management"
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      </div>

      <div className="inner-div">
        <OrganisationalUnitLoader
          OU="Software Reviews"
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      </div>

      <div className="inner-div">
        <OrganisationalUnitLoader
          OU="Hardware Reviews"
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      </div>

      <div className="inner-div">
        <OrganisationalUnitLoader
          OU="Opinion Publishing"
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      </div>
    </div>
  );
}

export default Credentials;
