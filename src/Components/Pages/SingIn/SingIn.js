import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Form from "../../Layout/UI/Form";
import { AuthActions } from "../../Store/AuthReducer";
import Button from "../../Layout/UI/Button";
import axios from "axios";

const SignIn = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");
  const history = useHistory("");
  const dispatch = useDispatch();

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;

    const userData = {
      email: emailValue,
      password: pswdValue,
      returnSecureToken: true
    };
    try {
      const response = await axios.post(
        "https://mongo-expense-tracker.onrender.com/signIn",
        userData,
        {
          headers: { "content-type": "application/json" }
        }
      );
      if (response.status === 201) {
        emailRef.current.value = "";
        pswdRef.current.value = "";

        dispatch(
          AuthActions.login({
            email: response.data.email,
            idToken: response.data.idToken,
            isPremiumUser: response.data.isPremiumUser,
            userName: response.data.userName
          })
        );
        history.replace("/welcome");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Form onSubmit={signInSubmitHandler}>
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
        <Button>Sign In</Button>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </Form>
    </React.Fragment>
  );
};

export default SignIn;
