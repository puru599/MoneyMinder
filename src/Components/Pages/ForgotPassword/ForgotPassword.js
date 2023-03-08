import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Layout/UI/Button";
import Form from "../../Layout/UI/Form";

const ForgotPassword = () => {
  const history = useHistory();

  const forgotEmailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const [successMessage, setSuccessMessage] = useState("");
  const [emailForm, setEmailForm] = useState(true);
  const [resetId, setResetId] = useState(null);

  const forgotSubmitHandler = async (event) => {
    event.preventDefault();

    const forgotEmailValue = forgotEmailRef.current.value;

    try {
      const response = await axios.post(
        "https://mongo-expense-tracker.onrender.com/forgotPasswordCalled",
        {
          email: forgotEmailValue
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 201) {
        setResetId(response.data.id);
        setEmailForm(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("User not found");
    }
  };

  const resetEmailHandler = async (event) => {
    event.preventDefault();

    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      return setSuccessMessage("Please Match Passwords");
    }

    try {
      const response = await axios.post(
        "https://mongo-expense-tracker.onrender.com/resetPassword",
        {
          password: password,
          confirmPassword: confirmPassword,
          resetId: resetId
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 201) {
        alert("Successful password reset...");
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        history.replace("/signIn");
      } else {
        throw new Error("Error in password reset");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      {emailForm && (
        <Form onSubmit={forgotSubmitHandler}>
          <label htmlFor="forgotEmailId">
            Enter the email which you have registered.
          </label>
          <input
            id="forgotEmailId"
            type="text"
            placeholder="Email"
            ref={forgotEmailRef}
          ></input>
          <Button>Send Link</Button>
        </Form>
      )}
      {!emailForm && (
        <Form onSubmit={resetEmailHandler}>
          <label htmlFor="resetEmail">Enter New Password</label>
          <input
            id="passwordId"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          ></input>
          <input
            id="confirmPasswordId"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          ></input>
          <Button>Reset Password</Button>
          {!!successMessage && <h4>{successMessage}</h4>}
        </Form>
      )}
    </React.Fragment>
  );
};

export default ForgotPassword;
