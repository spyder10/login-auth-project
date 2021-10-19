import Button from "../UI/Button/Button";
import styles from "./Login.module.css";
import Card from "../UI/Card/Card";
import { useState, useReducer, useEffect } from "react";
import {useContext} from 'react';
import AuthContext from "../../store/auth-context";



function Login(props) {
  const ctx = useContext(AuthContext);
  const [isFormValid, setFormValid] = useState(false);

  const emailStateReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { val: action.val, isvalid: action.val.includes("@") ,classes : action.val.includes('@') ? styles.control : styles.control + " " + styles.invalid};
    }
    // if(action.type === 'INPUT_BLUR'){
    //   return {val: state.val, isvalid : state.val.includes('@')}
    // }
    return { val: "", isvalid: false ,classes : styles.control };
  };
  const passwordStateReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { val: action.val, isvalid: action.val.trim().length > 6, classes : action.val.trim().length > 6 ? styles.control : styles.control + " " + styles.invalid };
    }
    return { val: "", isvalid: false, classes : styles.control};
  };
  const [emailState, dispatchEmail] = useReducer(emailStateReducer, {
    // Email State Reducer
    val: "",
    isvalid: null,
    classes : styles.control
  });
  const [passwordState, dispatchPassword] = useReducer(passwordStateReducer, {
    // Password State Reducer
    val: "",
    isvalid: null,
    classes : styles.control
  });


  useEffect(() => {
    setFormValid(emailState.isvalid && passwordState.isvalid);
  }, [emailState, passwordState]);

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
    ctx.onLogIn(userDetails);
    dispatchPassword();
    dispatchEmail();
  };

  // let emailClasses = styles.control;
  // if (!emailState.isvalid) {
  //   emailClasses += " " + styles.invalid;
  // }

  // let passwordClasses = styles.control;
  // if (!passwordState.isvalid) {
  //   passwordClasses += " " + styles.invalid;
  // }
  return (
    <Card className={styles.login}>
      <form onSubmit={formSubmitHandler}>
        <div className={emailState.classes}>
          <label>Email</label>
          <input
            type="text"
            value={emailState.val}
            onChange={emailChangeHandler}
            // onBlur={validateEmailChange}                       // No use of OnBlur because now we are checking validility on every key stroke using useReducer
          ></input>
        </div>

        <div className={passwordState.classes}>
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

/*

UseEffect :

used when a state of a variable depends on previous snapshots of 2 other vairables.
when we need to perform actions (side-effects) : sending http request, accessing browser local storage, etc 


UseReducer :

used when we need to combine related states together. For eg emailValue and its validity. We can also combine every state in one big State.
This helps to prevent buggy code as otherwise some related state would be depending on previous snapshots on other variables and simply using useState could cause bugs.


*/
