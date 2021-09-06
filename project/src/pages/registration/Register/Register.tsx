import classes from "./styles.module.scss";

import { Link } from "react-router-dom";

const Register: React.FC = (props) => {
    return (
        <div className={classes.register}>
            <h1>Rejestracja</h1>
            <div className={classes.links}>
                <Link to="/register/client">Zarejestruj się jako klient!</Link>
                <Link to="/register/courier">Zarejestruj się jako kurier!</Link>
                <Link to="/register/restaurant">
                    Zarejestruj się jako restauracja!
                </Link>
            </div>
            <p>Jesteś już zarejestrowany?</p>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default Register;
