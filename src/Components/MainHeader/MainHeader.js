import Card from "../UI/Card/Card";
import Navigation from "./Navigation";
import styles from './MainHeader.module.css';
import AuthContext from "../../store/auth-context";
import {useContext} from 'react';


function MainHeader(props) {
  const ctx = useContext(AuthContext);
  return (
  <Card className={styles['main-header']}>
    <div>
      <h2>A Typical Page</h2>
    </div>
    <div>
        {ctx.isLoggedIn && <Navigation ></Navigation>}
    </div>
  </Card>)
}
export default MainHeader;
