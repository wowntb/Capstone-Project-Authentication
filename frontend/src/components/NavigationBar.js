import { Link, useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from the session storage and redirect to the login page.
    sessionStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav>
      {/* These links are only rendered if there is no token in session storage. */}
      {!sessionStorage.getItem("token") && (
        <>
          <Link to="/register" className="navigation">
            Register
          </Link>
          <Link to="/login" className="navigation">
            Login
          </Link>
        </>
      )}

      {/* These link will only be rendered if there is a token in session storage. */}
      {sessionStorage.getItem("token") && (
        <>
          <Link to="/user" className="navigation">
            User
          </Link>
          <Link to="/credentials" className="navigation">
            Credentials Repository
          </Link>
          <Link to="/division" className="navigation">
            Division & OU Management
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
