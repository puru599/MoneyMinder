import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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

  test("Sign In Button", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </BrowserRouter>
    );
    const signInButton = screen.getByRole("button");
    userEvent.click(signInButton);

    const ExpensesText = screen.queryByText("Sign Up", {
      exact: false,
    });
    expect(ExpensesText).not.toBeInTheDocument();
  });
});
