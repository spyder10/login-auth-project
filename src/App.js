import MainHeader from "./Components/MainHeader/MainHeader";
import Home from "./Components/Home/Home";
import { useState, Fragment ,useEffect } from "react";
import Login from "./Components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('LoggedIn') === '1'){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  },[])

  const LogInHandler = (userDetails) =>{
    console.log(userDetails.email);
    console.log(userDetails.password);
    setIsLoggedIn(true);
  }
  const logOutHandler = () =>{
    localStorage.setItem('LoggedIn','0');
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
