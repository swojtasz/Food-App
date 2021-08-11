import classes from "./styles.module.css";

import { Link } from "react-router-dom";

const Register: React.FC = (props) => {
    return (
        <div className={classes.login}>
            <h1>Rejestracja</h1>
            <Link to="/register/client">Zarejestruj się jako klient!</Link>
            <Link to="/register/courier">Zarejestruj się jako kurier!</Link>
            <Link to="/register/restaurant">
                Zarejestruj się jako restauracja!
            </Link>
            <h3>Jesteś już zarejestrowany?</h3>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default Register;
