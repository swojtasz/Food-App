import classes from "../styles.module.scss";

import { useRef, useState } from "react";
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";
import { auth, db } from "../../../../config/firebase";
import { authActions } from "../../../../store/auth-slice";
import PlacesAutocompleteComponent from "../../../../components/GoogleMap/PlacesAutocomplete/PlacesAutocomplete";
import Button from "../../../../components/Button/Button";

const RestaurantForm: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const [address, setAddress] = useState<string>("");

    const [error, setError] = useState<null | string>(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const onSetAddress = (address: string) => {
        setAddress(address);
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const password = passwordRef.current!.value;
        const registrationProps = {
            name: nameRef.current!.value,
            email: emailRef.current!.value,
            phoneNumber: phoneNumberRef.current!.value,
            address: address,
            userType: "restaurant",
        };

        if (
            registrationProps.phoneNumber.trim().length < 9 ||
            registrationProps.address!.trim().length === 0 ||
            registrationProps.name!.trim().length === 0
        ) {
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
                db.ref(`menu/${result.user!.uid}/info`)
                    .set({
                        restaurantAddress: address,
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
                setError("Failed to sign up!");
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
                <label htmlFor="password">Has??o</label>
                <input type="password" id="password" ref={passwordRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="phone">Numer Telefonu</label>
                <input type="text" id="phone" ref={phoneNumberRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Adres</label>
                <PlacesAutocompleteComponent onSetAddress={onSetAddress} />
            </div>
            <Button type="submit">Zarejestruj</Button>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default RestaurantForm;
