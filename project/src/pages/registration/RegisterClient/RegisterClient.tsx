import classes from "../styles.module.scss";

import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const RegisterClient: React.FC = (props) => {
    return (
        <div className={classes.register}>
            <h1>Rejestracja</h1>
            <RegisterForm type={"client"} />
            <p>Jesteś już zarejestrowany?</p>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default RegisterClient;
