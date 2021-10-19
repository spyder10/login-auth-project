import Button from "../UI/Button/Button";
import styles from "./Login.module.css";
import Card from "../UI/Card/Card";
import { useState, useReducer, useEffect } from "react";
function Login(props) {
  const [isFormValid, setFormValid] = useState(false);

  const emailStateReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { val: action.val, isvalid: action.val.includes("@") };
    }
    // if(action.type === 'INPUT_BLUR'){
    //   return {val: state.val, isvalid : state.val.includes('@')}
    // }
    return { val: "", isvalid: true };
  };
  const passwordStateReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { val: action.val, isvalid: action.val.trim().length > 6 };
    }
    return { val: "", isvalid: true };
  };
  const [emailState, dispatchEmail] = useReducer(emailStateReducer, {
    // Email State Reducer
    val: "",
    isvalid: true,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordStateReducer, {
    // Password State Reducer
    val: "",
    isvalid: true,
  });

  const { isvalid: emailValid } = emailState;
  const { isvalid: passValid } = passwordState;
  useEffect(() => {                                                                             // isFormValid should be checked by useEffect as it is depending on 2 other states.
    if (emailState.val === "" || passwordState.val === "") {
      // This is for the initial state when emailState.isvalid and passwordState.isvalid are true but still we want button to not glow up.
      setFormValid(false);
    } else {
      setFormValid(emailState.isvalid && passwordState.isvalid);
    }
  }, [emailValid, passValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);                          // Whenever email is changing on every keystroke, we are setting the whole email state with its validlity by useReducer
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormValid(event.target.value.includes("@") && passwordState.isvalid);
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormValid(emailState.isvalid && event.target.value.trim().length > 6);
  };

  // const validateEmailChange = () =>{
  //   dispatchEmail({type:'INPUT_BLUR'});                       // No use of specifically check for Blur as we are checking input on every key stroke
  //     // if(!enteredEmail.includes('@')){
  //     //     setEmailValid(false);
  //     // }
  //     // else{
  //     //     setEmailValid(true);
  //     // }
  // }

  // const validatePasswordChange = () => {

  //     if(!(enteredPassword.trim().length > 6)){                // No use of specifically check for Blur as we are checking input on every key stroke
  //         setPasswordValid(false);
  //     }
  //     else{
  //         setPasswordValid(true);
  //     }
  // }
  const formSubmitHandler = (event) => {
    const userDetails = {
      email: emailState.val,
      password: passwordState.val,
    };
    event.preventDefault();
    localStorage.setItem("LoggedIn", "1");
    props.onLogIn(userDetails);
    dispatchPassword();
    dispatchEmail();
  };

  let emailClasses = styles.control;
  if (!emailState.isvalid) {
    emailClasses += " " + styles.invalid;
  }

  let passwordClasses = styles.control;
  if (!passwordState.isvalid) {
    passwordClasses += " " + styles.invalid;
  }
  return (
    <Card className={styles.login}>
      <form onSubmit={formSubmitHandler}>
        <div className={emailClasses}>
          <label>Email</label>
          <input
            type="text"
            value={emailState.val}
            onChange={emailChangeHandler}
            // onBlur={validateEmailChange}                       // No use of OnBlur because now we are checking validility on every key stroke using useReducer
          ></input>
        </div>

        <div className={passwordClasses}>
          <label>Password</label>
          <input
            type="password"
            value={passwordState.val}
            onChange={passwordChangeHandler}
            // onBlur={validatePasswordChange}                    // No use of OnBlur because now we are checking validility on every key stroke using useReducer
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
