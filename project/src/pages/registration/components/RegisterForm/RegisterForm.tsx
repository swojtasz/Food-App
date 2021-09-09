import classes from "../styles.module.scss";

import { useRef, useState } from "react";
import { useHistory } from "react-router";

import { auth, db } from "../../../../config/firebase";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth-slice";
import Button from "../../../../components/Button/Button";

const RegisterForm: React.FC<{ type: string }> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<null | string>(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const password = passwordRef.current!.value;
        const registrationProps = {
            email: emailRef.current!.value,
            phoneNumber: phoneNumberRef.current!.value,
            userType: props.type,
        };

        if (registrationProps.phoneNumber.trim().length < 9) {
            setError("Failed to sign up!");
            return;
        }

        auth.createUserWithEmailAndPassword(registrationProps.email, password)
            .then((result) => {
                dispatch(authActions.setIsLoading(true));
                db.ref(`users/${result.user!.uid}`)
                    .set(registrationProps)
                    .catch((error) => {
                        setError("Failed to push user to Database!");
                    });
            })
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setError("Failed to sign up!");
            });
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" ref={emailRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Hasło</label>
                <input type="password" id="password" ref={passwordRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="phone">Numer Telefonu</label>
                <input type="text" id="phone" ref={phoneNumberRef} />
            </div>
            <Button type="submit">Zarejestruj</Button>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default RegisterForm;
