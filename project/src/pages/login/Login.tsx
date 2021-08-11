import classes from "./styles.module.css";

import { Link } from "react-router-dom";

import LoginForm from "../../components/login/LoginForm";

const Login: React.FC = (props) => {
    return (
        <div className={classes.login}>
            <h1>Logowanie</h1>
            <LoginForm />
            <h3>Nie masz konta?</h3>
            <Link to="/register">Zarejestruj się!</Link>
        </div>
    );
};

export default Login;
