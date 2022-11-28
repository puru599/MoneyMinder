import { useRef, useState } from "react";
import Form from "../../Layout/UI/Form";

const ForgotPassword = () => {
  const forgotEmailRef = useRef("");
  const [successMessage, setSuccessMessage] = useState("");
  const forgotSubmitHandler = async (event) => {
    event.preventDefault();
    const forgotEmailValue = forgotEmailRef.current.value;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAle_pud5CBSRmol4VktTQSBgmBbnu0ZzQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: forgotEmailValue,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data.email);
      setSuccessMessage("Sent verify mail to your account...");
    } else {
      setSuccessMessage(data.error.message);
    }
  };
  return (
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
      <button>Send Link</button>
      {!!successMessage && <h4>{successMessage}</h4>}
    </Form>
  );
};

export default ForgotPassword;
