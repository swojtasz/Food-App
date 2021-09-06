import classes from "./styles.module.scss";

import { Link } from "react-router-dom";

import LoginForm from "../../components/login/LoginForm";

const Login: React.FC = (props) => {
    return (
        <div className={classes.login}>
            <h1>Logowanie</h1>
            <LoginForm />
            <p>Nie masz konta?</p>
            <Link to="/register">Zarejestruj się!</Link>
        </div>
    );
};

export default Login;
