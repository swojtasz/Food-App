import classes from "./styles.module.css";

import { useRef, useState } from "react";
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import { auth, db } from "../../../config/firebase";
import { authActions } from "../../../store/auth-slice";

const RestaurantForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<null | string>(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const password = passwordRef.current!.value;

        const registrationProps = {
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            phoneNumber: phoneNumberRef.current!.value,
            city: cityRef.current!.value,
            address: addressRef.current!.value,
            userType: "restaurant",
        };

        dispatch(authActions.setIsLoading(true));

        auth.createUserWithEmailAndPassword(registrationProps.email, password)
            .then((result) => {
                db.ref(`users/${result.user!.uid}`)
                    .set(registrationProps)
                    .catch((error) => {
                        setError("Failed to push user to Database!");
                    });
                db.ref(`menu/${result.user!.uid}/info`)
                    .set({
                        restaurantAddress: registrationProps.address,
                        restaurantCity: registrationProps.city,
                        restaurantPhone: registrationProps.phoneNumber,
                        restaurantName: registrationProps.name,
                    })
                    .catch((error) => {
                        setError("Failed to push user to Database!");
                    });
            })
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setError("Failed to sign up with email and password!");
            });
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Nazwa Restauracji</label>
                <input type="text" id="name" ref={nameRef} />
            </div>
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
            <div className={classes.control}>
                <label htmlFor="city">Miasto</label>
                <input type="text" id="city" ref={cityRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Adres</label>
                <input type="text" id="address" ref={addressRef} />
            </div>
            <button type="submit">Zarejestruj</button>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default RestaurantForm;
