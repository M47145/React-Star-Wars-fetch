import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav>
        <Link className="navbar-link" to="/">
          HOME
        </Link>

        <Link className="navbar-link" to="/Info">
          GET INFO
        </Link>
        <Link className="navbar-link" to="/About">
          ABOUT
        </Link>
      </nav>
    </div>
  );
}
export default Navbar;
