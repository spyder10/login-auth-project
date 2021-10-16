import styles from './Home.module.css';
import Card from '../UI/Card/Card';

function Home(){
    return <Card className={styles['home']}>
        <h1>Welcome Back!</h1>
    </Card>
}
export default Home;