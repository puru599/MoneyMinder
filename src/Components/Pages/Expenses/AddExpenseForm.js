import { useRef } from "react";
import Form from "../../Layout/UI/Form";
import classes from "./AddExpenseForm.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseFetching } from "../../Store/ActionCreators/ExpenseActionCreators";
import Button from "../../Layout/UI/Button";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const AddExpenseForm = (props) => {
  const id = document.getElementById("EditModalOverlay");
  const token = useSelector((state) => state.auth.idToken);

  const dispatch = useDispatch();

  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");
  const incomeRef = useRef("");
  const expenseRef = useRef("");

  const addExpenseHandler = (event) => {
    event.preventDefault();

    const incomeExpenseRef = incomeRef.current.checked
      ? incomeRef.current.value
      : expenseRef.current.value;

    const expense = {
      money: moneyRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
      incomeExpense: incomeExpenseRef,
      token: token
    };

    dispatch(addExpenseFetching(expense, props.email));

    moneyRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "Food";

    props.onClose();
  };

  const Overlay = () => {
    return (
      <div className={classes.modal}>
        <Form onSubmit={addExpenseHandler}>
          <h2>Add Expense</h2>
          <div>
            <label htmlFor="moneyId">Money Spent</label>
            <input id="moneyId" type="number" ref={moneyRef} required></input>
          </div>
          <div>
            <label htmlFor="descId">Description</label>
            <input id="descId" type="text" ref={descRef} required></input>
          </div>
          <div htmlFor="categoryId">
            <label htmlFor="categoryId">Category</label>
            <select id="categoryId" ref={categoryRef}>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Fuel">Fuel</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <fieldset>
            <input
              type="radio"
              id="expenseId"
              title="expense"
              name="incomeExpense"
              value="Expense"
              ref={expenseRef}
              defaultChecked
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="incomeId"
              title="income"
              name="incomeExpense"
              value="Income"
              ref={incomeRef}
            />
            <label htmlFor="income">Income</label>
          </fieldset>
          <Button>Add Expense</Button>
        </Form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, id)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, id)}
    </React.Fragment>
  );
};

export default AddExpenseForm;
