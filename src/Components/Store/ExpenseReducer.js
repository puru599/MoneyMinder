import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  expensesAmount: 0,
  leaderboardModal: false,
  leaderBoard: []
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses = action.payload.itemsArray;
      state.expensesAmount = action.payload.expensesAmount;
    },
    leaderBoardshow: (state, action) => {
      state.leaderboardModal = true;
      state.leaderBoard = action.payload;
    },
    leaderBoardDrop: (state) => {
      state.leaderboardModal = false;
    }
  }
});

export const ExpenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
