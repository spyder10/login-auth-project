import Button from "../UI/Button/Button";
import styles from "./Login.module.css";
import Card from "../UI/Card/Card";
import { useState } from "react";
function Login(props) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isFormValid, setFormValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormValid(
      enteredEmail.includes("@") && event.target.value.trim().length > 6
    );
  };

const validateEmailChange = () =>{
    if(!enteredEmail.includes('@')){
        setEmailValid(false);
    }
    else{
        setEmailValid(true);
    }
}

const validatePasswordChange = () => {
    if(!(enteredPassword.trim().length > 6)){
        setPasswordValid(false);
    }
    else{
        setPasswordValid(true);
    }
}
  const formSubmitHandler = (event) => {
    const userDetails = {
      email: enteredEmail,
      password: enteredPassword,
    };
    event.preventDefault();
    props.onLogIn(userDetails);
    setEnteredPassword("");
    setEnteredEmail("");
  };

  let emailClasses = styles.control;
  if(!isEmailValid){
    emailClasses+= " " + styles.invalid;
  }

  let passwordClasses = styles.control;
  if(!isPasswordValid){
      passwordClasses += " " + styles.invalid;
  }
  return (
    <Card className={styles.login}>
      <form onSubmit={formSubmitHandler}>
        <div className={emailClasses}>
          <label>Email</label>
          <input
            type="text"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailChange}
          ></input>
        </div>

        <div className={passwordClasses}>
          <label>Password</label>
          <input
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordChange}
          ></input>
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            className={styles.action}
            disabled={!isFormValid}
          >
            Log In
          </Button>
        </div>
      </form>
    </Card>
  );
}
export default Login;
