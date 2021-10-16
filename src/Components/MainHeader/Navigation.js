import styles from './Navigation.module.css';
import Button from '../UI/Button/Button';

function Navigation (props){

    
    const logOutHandler = () => {
        props.onLogOut();
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <a href='/'>Users</a>
                </li>
                <li>
                    <a href='/'>Admin</a>
                </li>
                <li>
                    <Button onClick={logOutHandler}>Log Out</Button>
                </li>
            </ul>
        </nav>
    )
}
export default Navigation;