import { Link } from "react-router-dom";
import classes from "./styles.module.css";

const NotLoggedView: React.FC = () => {
    return (
        <div className={classes.container}>
            <h1>Głodny?</h1>
            <h3>Zamów jedzenie już teraz!</h3>
            <h3>Aby kontynuwać</h3>
            <Link to="/login">Zaloguj się</Link>
            <h3>lub</h3>
            <Link to="/register">Zarejestruj się</Link>
        </div>
    );
};

export default NotLoggedView;
