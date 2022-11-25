import { useRef, useState } from "react";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");
  const confirmPswdRef = useRef("");
  const [auth, setAuth] = useState(false);
  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;
    const confirmPswdValue = confirmPswdRef.current.value;
    if (
      emailValue.includes("@") &&
      emailValue.includes(".") &&
      pswdValue.length > 5 &&
      confirmPswdValue === pswdValue
    ) {
      setAuth(false);
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAle_pud5CBSRmol4VktTQSBgmBbnu0ZzQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: confirmPswdValue,
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
        confirmPswdRef.current.value = "";
      } else {
        alert(data.error.message);
      }
    } else {
      return setAuth(true);
    }
  };
  return (
    <form onSubmit={signUpSubmitHandler} className={classes.signUp}>
      <div>
        <h3>Sign Up</h3>
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
        <input
          id="confirmPwdId"
          placeholder="Confirm Password"
          type="password"
          ref={confirmPswdRef}
        />
      </div>
      <button>Sign Up</button>
      {auth && <h3>Enter Credentials</h3>}
    </form>
  );
};

export default SignUp;
