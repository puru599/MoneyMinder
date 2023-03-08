import axios from "axios";
import { AuthActions } from "../AuthReducer";
import { ExpenseActions } from "../ExpenseReducer";

export const getExpenseFetching = (email, retrievedToken) => {
  return async (dispatch) => {
    const getExpenseFetching = async () => {
      try {
        const response = await fetch(`https://mongo-expense-tracker.onrender.com/expenses`, {
          method: "GET",
          headers: { Auth: retrievedToken }
        });
        const data = await response.json();

        let itemsArray = [];
        let expensesAmount;

        if (!!data.expenses) {
          itemsArray = data.expenses.map((expense) => {
            return {
              id: expense._id,
              money: expense.amount,
              description: expense.description,
              category: expense.category,
              incomeExpense: expense.incomeExpense,
              timeStamp: expense.createdAt
            };
          });
        }

        expensesAmount = itemsArray.reduce((curNumber, expense) => {
          return curNumber + Number(expense.money);
        }, 0);

        dispatch(
          ExpenseActions.addExpense({
            itemsArray: itemsArray.reverse(),
            expensesAmount: expensesAmount
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    getExpenseFetching(email);
  };
};

export const addExpenseFetching = (expense, email) => {
  return async (dispatch) => {
    const addExpenseFetching = async (expense, email) => {
      try {
        await fetch(`https://mongo-expense-tracker.onrender.com/addExpense`, {
          method: "POST",
          body: JSON.stringify({
            amount: expense.money,
            description: expense.description,
            category: expense.category,
            incomeExpense: expense.incomeExpense,
            token: expense.token
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        dispatch(getExpenseFetching(email, expense.token));
      } catch (error) {
        alert(error.message);
      }
    };
    addExpenseFetching(expense, email);
  };
};

export const editExpenseFetching = (expenseItem, email, token) => {
  return async (dispatch) => {
    const editExpenseFetching = async () => {
      try {
        await axios.post(
          `https://mongo-expense-tracker.onrender.com/editExpense`,
          {
            expenseId: expenseItem.id,
            money: expenseItem.money,
            description: expenseItem.description,
            category: expenseItem.category,
            incomeExpense: expenseItem.incomeExpense,
            token: token
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        dispatch(getExpenseFetching(email, token));
      } catch (error) {
        alert(error.message);
      }
    };
    editExpenseFetching(expenseItem, email);
  };
};

export const deleteExpenseFetching = (id, email, token) => {
  return async (dispatch) => {
    const deleteExpenseFetching = async () => {
      try {
        await axios.post(
          "https://mongo-expense-tracker.onrender.com/deleteExpense",
          {
            expenseId: id,
            email: email,
            token: token
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        dispatch(getExpenseFetching(email, token));
      } catch (error) {
        alert(error.message);
      }
    };
    deleteExpenseFetching(id, email);
  };
};

export const activatePremium = (event, token, Razorpay) => {
  return async (dispatch) => {
    const razorpayFunction = async (event, Razorpay) => {
      const response = await axios.get("https://mongo-expense-tracker.onrender.com/premium", {
        headers: { Auth: token }
      });

      var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          await axios.post(
            "https://mongo-expense-tracker.onrender.com/updateStatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id
            },
            {
              headers: { Auth: token }
            }
          );

          alert("You are a Premium User Now");

          dispatch(
            AuthActions.isPremium({
              isPremium: true
            })
          );
        }
      };

      const rzp1 = new Razorpay(options);

      event.preventDefault();

      rzp1.open();
      rzp1.on("payment.failed", function (response) {
        axios.post(
          "https://mongo-expense-tracker.onrender.com/updateStatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id
          },
          { headers: { Auth: token } }
        );
        alert("Payment failed");
      });
    };
    razorpayFunction(event, Razorpay);
  };
};
