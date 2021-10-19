import styles from "./Navigation.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import {useContext} from 'react';

function Navigation(props) {
    const ctx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href="/">Users</a>
        </li>
        <li>
          <a href="/">Admin</a>
        </li>
        <li>
          <Button onClick={ctx.onLogOut}>Log Out</Button>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
