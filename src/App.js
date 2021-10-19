import MainHeader from "./Components/MainHeader/MainHeader";
import Home from "./Components/Home/Home";
import {  useContext, Fragment } from "react";
import Login from "./Components/Login/Login";
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Fragment>
      <MainHeader></MainHeader>
      <div>
        {!ctx.isLoggedIn && <Login></Login>}
        {ctx.isLoggedIn && <Home></Home>}
      </div>
    </Fragment>
  );
}

export default App;
