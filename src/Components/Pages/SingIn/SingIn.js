import React from "react";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");

  const [auth, setAuth] = useState(false);

  const history = useHistory("");

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;

    if (
      emailValue.includes("@") &&
      emailValue.includes(".") &&
      pswdValue.length > 5
    ) {
      setAuth(false);

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAle_pud5CBSRmol4VktTQSBgmBbnu0ZzQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: pswdValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.email);
        emailRef.current.value = "";
        pswdRef.current.value = "";
        history.replace("/welcome");
      } else {
        alert(data.error.message);
      }
    } else {
      return setAuth(true);
    }
  };
  return (
    <form onSubmit={signInSubmitHandler} className={classes.signIn}>
      <div>
        <h3>Sign In</h3>
      </div>
      <div>
        <input
          id="emailId"
          placeholder="Email"
          type="text"
          ref={emailRef}
        ></input>
        <input
          id="passwordId"
          placeholder="Password"
          type="password"
          ref={pswdRef}
        />
      </div>
      <button>Sign In</button>
      {auth && <h3>Enter Credentials</h3>}
    </form>
  );
};

export default SignIn;
