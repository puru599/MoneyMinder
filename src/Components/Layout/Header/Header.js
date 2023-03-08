import axios from "axios";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { activatePremium } from "../../Store/ActionCreators/ExpenseActionCreators";
import { AuthActions } from "../../Store/AuthReducer";
import { ExpenseActions } from "../../Store/ExpenseReducer";
import { themeActions } from "../../Store/ThemeReducer";
import Button from "../UI/Button";
import classes from "./Header.module.css";

const Header = () => {
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();

  let isPremiumUser = useSelector((state) => state.auth.isPremiumUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme.theme);
  const expenses = useSelector((state) => state.expense.expenses);
  const token = useSelector((state) => state.auth.idToken);
  const userName = useSelector((state) => state.auth.userName);

  if (typeof isPremiumUser !== "boolean" && isPremiumUser === "false") {
    isPremiumUser = false;
  }
  if (typeof isPremiumUser !== "boolean" && isPremiumUser === "true") {
    isPremiumUser = true;
  }

  const logoutHandler = () => {
    dispatch(AuthActions.logout());
  };

  const activatePremiumitemsount = async (event) => {
    dispatch(activatePremium(event, token, Razorpay));
  };

  const darkModeActivation = () => {
    dispatch(themeActions.switchTheme());
  };

  const showLeaderBoard = async () => {
    const response = await axios.get("https://mongo-expense-tracker.onrender.com/showLeaderboard");
    const sortedUsers = response.data.sort((a, b) =>
      a.totalAmount < b.totalAmount ? 1 : -1
    );

    dispatch(ExpenseActions.leaderBoardshow(sortedUsers));
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");

    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);

    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });

    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const downloadExpenses = () => {
    let headers = ["Money,Description,Category,Income/Expense,Date"];

    let expensesCsv = expenses.reduce((items, expenses) => {
      const { money, description, category, incomeExpense, timeStamp } =
        expenses;
      items.push(
        [money, description, category, incomeExpense, timeStamp].join(",")
      );
      return items;
    }, []);

    downloadFile({
      data: [...headers, ...expensesCsv].join("\n"),
      fileName: "expenses.csv",
      fileType: "text/csv"
    });
  };

  return (
    <header className={classes.header}>
      {!!isLoggedIn && (
        <div className={classes.Logo}>
          <h1>{userName}'s </h1>
          <h5> Expense Tracker</h5>
        </div>
      )}
      {!isLoggedIn && <h1>Expense Tracker</h1>}
      <div>
        {!isLoggedIn && <Link to="/signUp">Sign Up</Link>}
        {!isLoggedIn && <Link to="/signIn">Sign In</Link>}
        {!!isLoggedIn && !!isPremiumUser && (
          <Button onClick={showLeaderBoard}>Leaderboard </Button>
        )}

        {!!isLoggedIn && !isPremiumUser && (
          <Button onClick={activatePremiumitemsount}>
            Activate Premium Account
          </Button>
        )}
        {!!isLoggedIn && !!isPremiumUser && (
          <Button onClick={darkModeActivation}>
            {!theme ? "Dark Mode" : "Light Mode"}
          </Button>
        )}
        {!!isLoggedIn && !!isPremiumUser && (
          <Button onClick={downloadExpenses}>Download Expenses</Button>
        )}
        {!!isLoggedIn && (
          <Link onClick={logoutHandler} to="/signIn">
            Logout
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
