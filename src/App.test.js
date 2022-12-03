import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Components/Store/Store";
import { BrowserRouter } from "react-router-dom";


describe("App Test", () => {
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

  // test("Expense Tracker", () => {
  //   render(
  //     <BrowserRouter>
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     </BrowserRouter>
  //   );
  //   const Logout = screen.getByRole("select");
  //   userEvent.click(Logout);

  //   const ExpensesText = screen.getByText("Other", {
  //     exact: false,
  //   });
  //   expect(ExpensesText).toBeInTheDocument();
  // });


});
