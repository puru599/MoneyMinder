import React from "react";
import "./App.css";
import SignUp from "./Components/Pages/SingUp/SignUp";
import Header from "./Components/Layout/Header/Header";
import { Redirect, Route } from "react-router-dom";
import SignIn from "./Components/Pages/SingIn/SingIn";
import Welcome from "./Components/Pages/Welcome/Welcome";
import IncompleteProfile from "./Components/Pages/IncompleteProfile/IncompleteProfile";
import ForgotPassword from "./Components/Pages/ForgotPassword/ForgotPassword";
import Expenses from "./Components/Pages/Expenses/Expenses";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "./Components/Store/ExpenseReducer";
import HomePage from "./Components/Pages/HomePage/HomePage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const getExpenseFetching = async () => {
    try {
      const response = await fetch(
        "https://react-expense-tracker-27b38-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      let itemsArray = [];
      let expensesAmount;
      if (!!data) {
        itemsArray = Object.keys(data).map((expense) => {
          return {
            id: expense,
            money: data[expense].money,
            description: data[expense].description,
            category: data[expense].category,
          };
        });
      }
      expensesAmount = itemsArray.reduce((curNumber, expense) => {
        return curNumber + Number(expense.money);
      }, 0);
      dispatch(
        ExpenseActions.addExpense({
          itemsArray: itemsArray,
          expensesAmount: expensesAmount,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <Header></Header>
      {/* <Route path="*">
          <Redirect to="/signIn" />
        </Route> */}
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/incompleteProfile">
        <IncompleteProfile />
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword />
      </Route>
      <Route path="/expenses">
        {isLoggedIn ? (
          <Expenses getExpenseFetching={getExpenseFetching} />
        ) : (
          <Redirect to="/signIn" />
        )}
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </React.Fragment>
  );
}

export default App;
