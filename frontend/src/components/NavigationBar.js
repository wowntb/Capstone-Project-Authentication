import { Link, useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from the local storage and redirect to the login page.
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav>
      {/* These links are only rendered if there is no token in local storage. */}
      {!localStorage.getItem("token") && (
        <>
          <Link to="/register" className="navigation">
            Register
          </Link>
          <Link to="/login" className="navigation">
            Login
          </Link>
        </>
      )}

      {/* These link will only be rendered if there is a token in local storage. */}
      {localStorage.getItem("token") && (
        <>
          <Link to="/credentials" className="navigation">
            Credentials
          </Link>
          <Link to="/user" className="navigation">
            User
          </Link>
          <Link to="/login" className="navigation" onClick={handleLogout}>
            Logout
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavigationBar;
