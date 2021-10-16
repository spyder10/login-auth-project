import MainHeader from "./Components/MainHeader/MainHeader";
import Home from "./Components/Home/Home";
import { useState, Fragment } from "react";
import Login from "./Components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const LogInHandler = (userDetails) =>{
    console.log(userDetails.email);
    console.log(userDetails.password);
    setIsLoggedIn(true);
  }
  const logOutHandler = () =>{
    setIsLoggedIn(false);
  }
  return (
    <Fragment>
      <MainHeader logInState={isLoggedIn} onLogOut={logOutHandler}></MainHeader>
      <div>
        {!isLoggedIn && <Login onLogIn={LogInHandler}></Login>}
        {isLoggedIn && <Home></Home>}
      </div>
    </Fragment>
  );
}

export default App;
