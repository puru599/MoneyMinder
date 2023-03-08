import classes from "./Leaderboard.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { ExpenseActions } from "../../Store/ExpenseReducer";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const Leaderboard = (props) => {
  const dispatch = useDispatch();
  const id = document.getElementById("EditModalOverlay");
  const leaderBoard = useSelector((state) => state.expense.leaderBoard);

  const onCloseLeaderBoardModal = () => {
    dispatch(ExpenseActions.leaderBoardDrop());
  };

  const Overlay = () => {
    return (
      <div className={classes.modal}>
        <table id="TableId" className={classes.Table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Expense</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onCloseLeaderBoardModal} />,
        id
      )}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, id)}
    </React.Fragment>
  );
};

export default Leaderboard;
