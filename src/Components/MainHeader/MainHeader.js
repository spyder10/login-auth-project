import Card from "../UI/Card/Card";
import Navigation from "./Navigation";
import styles from './MainHeader.module.css';


function MainHeader(props) {
  return (
  <Card className={styles['main-header']}>
    <div>
      <h2>A Typical Page</h2>
    </div>
    <div>
        {props.logInState && <Navigation onLogOut={props.onLogOut}></Navigation>}
    </div>
  </Card>)
}
export default MainHeader;
