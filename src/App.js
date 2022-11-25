import React from "react";
import "./App.css";
import SignUp from "./Components/Pages/SingUp/SignUp";
import Header from "./Components/Layout/Header/Header";
import { Redirect, Route } from "react-router-dom";
import SignIn from "./Components/Pages/SingIn/SingIn";
import Expense from "./Components/Pages/DummyExpenseTracker";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="*">
        <Redirect to="/signUp" />
      </Route>
      <Route path="/welcome">
        <Expense />
      </Route>
    </React.Fragment>
  );
}

export default App;
