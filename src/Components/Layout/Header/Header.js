import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthActions } from "../../Store/AuthReducer";
import { themeActions } from "../../Store/ThemeReducer";
import Button from "../UI/Button";
import classes from "./Header.module.css";

const Header = () => {
  const [premiumButton, setPremiumButton] = useState(true);
  const [premiumitemsount, setPremiumitemsount] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const expensesAmount = useSelector((state) => state.expense.expensesAmount);
  const theme = useSelector((state) => state.theme.theme);

  const expenses = useSelector((state) => state.expense.expenses);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(AuthActions.logout());
  };

  const activatePremiumitemsount = () => {
    setPremiumButton(false);
    setPremiumitemsount(true);
  };

  const darkModeActivation = () => {
    dispatch(themeActions.switchTheme());
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const downloadExpenses = () => {
    let headers = ["Money,Description,Category"];

    let expensesCsv = expenses.reduce((items, expenses) => {
      const { money, description, category } = expenses;
      items.push([money, description, category].join(","));
      return items;
    }, []);

    downloadFile({
      data: [...headers, ...expensesCsv].join("\n"),
      fileName: "expenses.csv",
      fileType: "text/csv",
    });
  };

  return (
    <header className={classes.header}>
      <h1>Expense Tracker</h1>
      <div>
        {!isLoggedIn && <Link to="/signUp">Sign Up</Link>}
        {!isLoggedIn && <Link to="/signIn">Sign In</Link>}
        {!!isLoggedIn && <Link to="/expenses">Expenses</Link>}
        {!!isLoggedIn && (
          <Link to="/incompleteProfile">Complete Your Profile</Link>
        )}
        {!!isLoggedIn && (
          <Link onClick={logoutHandler} to="/signIn">
            Logout
          </Link>
        )}
        {!!isLoggedIn && expensesAmount > 1000 && premiumButton && (
          <Button onClick={activatePremiumitemsount}>
            Activate Premium Account
          </Button>
        )}
        {!!isLoggedIn && premiumitemsount && expensesAmount > 1000 && (
          <Button onClick={darkModeActivation}>
            {!theme ? "Dark Mode" : "Light Mode"}
          </Button>
        )}
        {!!isLoggedIn && premiumitemsount && expensesAmount > 1000 && (
          <Button onClick={downloadExpenses}>Download Expenses</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
