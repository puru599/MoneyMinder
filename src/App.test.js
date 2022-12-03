import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Components/Store/Store";
import { BrowserRouter } from "react-router-dom";
import Expenses from "./Components/Pages/Expenses/Expenses";

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

  test("Expense Tracker", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const Logout = screen.getByRole("select");
    userEvent.click(Logout);

    const ExpensesText = screen.getByText("Other", {
      exact: false,
    });
    expect(ExpensesText).toBeInTheDocument();
  });

  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          money: "expense.money",
          description: "expense.description",
          category: "expense.category",
        },
      ],
    });
    render(<Expenses />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
