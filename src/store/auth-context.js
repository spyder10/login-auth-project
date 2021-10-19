import React from "react";
import { useEffect,useState } from 'react';


const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogIn: () => {},
  onLogOut: () => {},
});

export const AuthContextProvider = (props) => {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("LoggedIn") === "1") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logOutHandler = () => {
    localStorage.setItem("LoggedIn", "0");
    setIsLoggedIn(false);
  };
  const LogInHandler = (userDetails) => {
    console.log(userDetails.email);
    console.log(userDetails.password);
    setIsLoggedIn(true);
  };
  return <AuthContext.Provider value={{
      isLoggedIn : isLoggedIn,
      onLogIn:LogInHandler,
      onLogOut:logOutHandler
  }}>{props.children}
  </AuthContext.Provider>
}
export default AuthContext;
