import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.Header}>
      <div>
        <h3>Expense Tracker</h3>
      </div>
      <Link to="/signIn">Sign In</Link>
      <Link to="/items">Items</Link>
    </header>
  );
};

export default Header;
