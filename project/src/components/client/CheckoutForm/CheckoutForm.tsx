import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../config/firebase";
import { Order } from "../../../types/Order";
import classes from "./styles.module.css";

const CheckoutForm: React.FC<{ closePopup: () => void; order: Order[] }> = (
    props
) => {
    const [isError, setIsError] = useState<string | null>(null);
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const onSetAddress = (address: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(address.target.value);
    };

    const onSetNumber = (phoneNumber: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(phoneNumber.target.value);
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (address.trim().length === 0) {
            setIsError("Błąd! Podaj adres dostawy"!);
            return;
        }
        if (phoneNumber.trim().length === 0) {
            setIsError("Błąd! Podaj numer telefonu!");
            return;
        }

        setIsLoading(true);
        const database = db.ref();

        database
            .child(`orders`)
            .push({
                order: props.order,
                address: address,
                phoneNumber: phoneNumber,
            })
            .then(() => {
                console.log("Udalo sie zamowic jedzenie!");
                history.push("/");
            })
            .catch((error) => {
                setIsError(error.message);
                console.log(error);
            });

        setIsLoading(false);

        setAddress("");
        setPhoneNumber("");
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div>
                <label htmlFor="address">Adres dostawy:</label>
                <input
                    type="text"
                    id="address"
                    onChange={onSetAddress}
                    value={address}
                />
            </div>
            <div>
                <label htmlFor="number">Numer telefonu:</label>
                <input
                    type="text"
                    id="number"
                    onChange={onSetNumber}
                    value={phoneNumber}
                />
            </div>
            {isError && <p>{isError}</p>}
            <div className={classes.bottom}>
                <button
                    onClick={props.closePopup}
                    style={{ backgroundColor: "darkred" }}
                >
                    Anuluj
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: "green" }}
                >
                    Potwierdź zamówienie
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
