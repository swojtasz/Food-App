import classes from "./styles.module.css";

import { useRef, useState } from "react";
import { useHistory } from "react-router";

import { auth, db } from "../../../config/firebase";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../../store/loading-slice";

const RegisterForm: React.FC<{ type: string }> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<null | string>(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const registrationProps = {
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
            phoneNumber: phoneNumberRef.current!.value,
        };

        dispatch(loadingActions.setIsLoading(true));

        auth.createUserWithEmailAndPassword(
            registrationProps.email,
            registrationProps.password
        )
            .then((result) => {
                result
                    .user!.updateProfile({
                        displayName: props.type,
                    })
                    .catch(() => {
                        setError("Failed to update profile!");
                    });
                db.ref(`users/${props.type}/${result.user!.uid}`)
                    .set(registrationProps)
                    .catch((error) => {
                        setError("Failed to push user to Database!");
                    });
            })
            .then(() => {
                dispatch(loadingActions.setIsLoading(false));
                history.push("/");
            })
            .catch(() => {
                setError("Failed to sign up with email and password!");
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
            <button type="submit">Zarejestruj</button>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default RegisterForm;
