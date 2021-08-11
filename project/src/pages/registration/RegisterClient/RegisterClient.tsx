import classes from "./styles.module.css";

import { Link } from "react-router-dom";
import RegisterForm from "../../../components/register/RegisterForm/RegisterForm";

const RegisterClient: React.FC = (props) => {
    return (
        <div className={classes.login}>
            <h1>Rejestracja</h1>
            <RegisterForm type={"client"} />
            <h3>Jesteś już zarejestrowany?</h3>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default RegisterClient;
