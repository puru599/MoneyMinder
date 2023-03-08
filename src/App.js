import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./App.module.css";

const SignUp = React.lazy(() => import("./Components/Pages/SingUp/SignUp"));
const Header = React.lazy(() => import("./Components/Layout/Header/Header"));
const SignIn = React.lazy(() => import("./Components/Pages/SingIn/SingIn"));
const ForgotPassword = React.lazy(() =>
  import("./Components/Pages/ForgotPassword/ForgotPassword")
);
const Expenses = React.lazy(() =>
  import("./Components/Pages/Expenses/Expenses")
);
const HomePage = React.lazy(() =>
  import("./Components/Pages/HomePage/HomePage")
);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme.theme);

  let themeValue;
  if (theme) {
    themeValue = classes.AppDark;
  } else {
    themeValue = classes.AppLight;
  }

  return (
    <div className={themeValue}>
      <Suspense>
        <Header></Header>
        <Switch>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/expenses">
            {isLoggedIn ? <Expenses /> : <Redirect to="/signIn" />}
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {isLoggedIn && (
            <Route path="*">
              <Redirect to="/expenses" />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="*">
              <Redirect to="/" />
            </Route>
          )}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
