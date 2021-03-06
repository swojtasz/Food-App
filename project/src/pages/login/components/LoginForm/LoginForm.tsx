import classes from "./styles.module.scss";

import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../../../config/firebase";
import { authActions } from "../../../../store/auth-slice";
import Button from "../../../../components/Button/Button";

const LoginForm: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<null | string>(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const loginProps = {
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
        };

        auth.signInWithEmailAndPassword(loginProps.email, loginProps.password)
            .then((result) => {
                dispatch(authActions.setIsLoading(true));
                history.push("/");
            })
            .catch((error) => {
                setError("Login failed!");
            });
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" autoFocus ref={emailRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Hasło</label>
                <input type="password" id="password" ref={passwordRef} />
            </div>
            <Button type="submit">Zaloguj</Button>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default LoginForm;
