import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
          <div>
            <button onClick={handleLogoutClick}>Log out</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
