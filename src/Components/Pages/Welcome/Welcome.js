import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";

const Welcome = () => {
  const loginCtx = useContext(LoginContext);
  const verifyEmailHandler = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAle_pud5CBSRmol4VktTQSBgmBbnu0ZzQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: loginCtx.idToken,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data.email);
    } else {
      alert(data.error.message);
    }
  };

  return (
    <div>
      <h2>Welcome To Expense Tracker</h2>
      <p>
        Your Profile is incomplete.
        <Link to="/incompleteProfile"> Complete Profile</Link>
      </p>
      <button onClick={verifyEmailHandler}> Verify Email</button>
    </div>
  );
};

export default Welcome;
