import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Expenses from "./Expenses";
import { BrowserRouter } from "react-router-dom";
import store from '../../Store/Store'

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
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Expenses />
      </Provider>
    </BrowserRouter>
  );

  const listItemElements = await screen.findAllByRole("listitem");
  expect(listItemElements).not.toHaveLength(0);
});
