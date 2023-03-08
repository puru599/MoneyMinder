import { useSelector } from "react-redux";
import Button from "../../Layout/UI/Button";
import classes from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);

  const dateConversion = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className={classes.ExpenseItem}>
      <ul>
        {expenses.map((expenseItem) => (
          <li key={expenseItem.id}>
            <header>
              <span className={classes.headerLeft}>
                <h2>{expenseItem.description}</h2>
                <h4>{dateConversion(expenseItem.timeStamp)}</h4>
              </span>
              <span className={classes.headerRight}>
                <h2>${expenseItem.money}</h2>
                <h4>{expenseItem.incomeExpense}</h4>
              </span>
            </header>
            <div>
              <div>
                <h3>{expenseItem.category}</h3>
              </div>
              <div className={classes.ButtonItems}>
                <Button
                  onClick={props.editExpense.bind(
                    null,
                    expenseItem.id,
                    expenseItem.money,
                    expenseItem.description,
                    expenseItem.category
                  )}
                >
                  Edit
                </Button>
                <Button
                  onClick={props.deleteExpenseHandler.bind(
                    null,
                    expenseItem.id
                  )}
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseItem;
