import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App";
import store from "../../Store/Store";
import SignIn from "./SingIn";

describe("SignIn Test", () => {
  test("SignIn text", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </BrowserRouter>
    );
    const signInText = screen.getByText("Forgot", { exact: false });
    expect(signInText).toBeInTheDocument();
  });

  test("Email PlaceHolder", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </BrowserRouter>
    );
    const EmailPlaceHolder = screen.getByPlaceholderText("Email", {
      exact: false,
    });
    expect(EmailPlaceHolder).toBeInTheDocument();
  });

  test("Expense Tracker", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const expenseTracker = screen.getByText("Sign Up", {
      exact: false,
    });
    expect(expenseTracker).toBeInTheDocument();
  });
});
