import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../Layout/UI/Form";
import Button from "../../Layout/UI/Button";
import axios from "axios";

const SignUp = () => {
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const pswdRef = useRef("");
  const confirmPswdRef = useRef("");

  const [userNameValid, setUserNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pswdValid, setPswdValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);

  const history = useHistory();

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();

    const userNameValue = userNameRef.current.value;
    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;
    const confirmPswdValue = confirmPswdRef.current.value;

    if (
      userNameValue.length > 0 &&
      emailValue.includes("@") &&
      emailValue.includes(".") &&
      pswdValue.length > 5 &&
      confirmPswdValue === pswdValue
    ) {
      setUserNameValid(false);
      setEmailValid(false);
      setPswdValid(false);
      setConfirmValid(false);

      const userData = {
        userName: userNameValue,
        email: emailValue,
        password: confirmPswdValue,
        returnSecureToken: true
      };

      const response = await axios.post(
        "https://mongo-expense-tracker.onrender.com/signUp",
        userData,
        {
          headers: { "content-type": "application/json" }
        }
      );

      if (response.status === 200) {
        userNameRef.current.value = "";
        emailRef.current.value = "";
        pswdRef.current.value = "";
        confirmPswdRef.current.value = "";

        history.replace("/signIn");
      } else {
        alert(response.response);
      }
    } else {
      if (userNameValue.length < 1) {
        setUserNameValid(true);
      }
      if (!emailValue.includes("@") || !emailValue.includes(".")) {
        setEmailValid(true);
      }
      if (pswdValue.length < 5) {
        setPswdValid(true);
      }
      if (confirmPswdValue !== pswdValue) {
        setConfirmValid(true);
      }
    }
  };
  return (
    <Form onSubmit={signUpSubmitHandler}>
      <div>
        <h3>Sign Up</h3>
      </div>
      <div>
        <input
          id="userNameId"
          placeholder="User Name"
          type="text"
          ref={userNameRef}
        ></input>
        {userNameValid && <p>Please Enter User Name</p>}
        <input
          id="emailId"
          placeholder="Email"
          type="text"
          ref={emailRef}
        ></input>
        {emailValid && <p>Please Enter Valid Email</p>}
        <input
          id="passwordId"
          placeholder="Password"
          type="password"
          ref={pswdRef}
        />
        {pswdValid && <p>Please Enter Valid Password</p>}
        <input
          id="confirmPwdId"
          placeholder="Confirm Password"
          type="password"
          ref={confirmPswdRef}
        />
        {confirmValid && <p>Please Match the Password</p>}
      </div>
      <Button>Sign Up</Button>
    </Form>
  );
};

export default SignUp;
