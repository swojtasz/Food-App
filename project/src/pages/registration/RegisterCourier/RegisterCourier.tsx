import classes from "../styles.module.scss";

import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const RegisterCourier: React.FC = (props) => {
    return (
        <div className={classes.register}>
            <h1>Rejestracja</h1>
            <RegisterForm type={"courier"} />
            <p>Jesteś już zarejestrowany?</p>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default RegisterCourier;
