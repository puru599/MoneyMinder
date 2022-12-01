import { useDispatch, useSelector } from "react-redux";

const ExpenseItem = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-expense-tracker-27b38-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      props.getExpenseFetching();
    } catch (error) {
      alert(error.message);
    }
  };

  // const  = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://react-expense-tracker-27b38-default-rtdb.firebaseio.com/expenses.json",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     let itemsArray = [];
  //     if (!!data) {
  //       itemsArray = Object.keys(data).map((expense) => {
  //         return {
  //           id: expense,
  //           money: data[expense].money,
  //           description: data[expense].description,
  //           category: data[expense].category,
  //         };
  //       });
  //     }
  //     dispatch(ExpenseActions.addExpense(itemsArray));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <ul>
      {expenses.map((expenseItem) => (
        <li key={expenseItem.id}>
          {expenseItem.money} {expenseItem.description} {expenseItem.category}
          <button
            onClick={props.editExpense.bind(
              null,
              expenseItem.id,
              expenseItem.money,
              expenseItem.description,
              expenseItem.category
            )}
          >
            Edit
          </button>
          <button onClick={deleteExpenseHandler.bind(null, expenseItem.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseItem;
