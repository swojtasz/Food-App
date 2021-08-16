import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../config/firebase";
import { Order } from "../../../types/Order";
import { RestaurantInfo } from "../../../types/RestaurantInfo";
import PlacesAutocompleteComponent from "../../GoogleMap/PlacesAutocomplete";
import classes from "./styles.module.css";

const CheckoutForm: React.FC<{
    closePopup: () => void;
    order: Order[];
    restaurantInfo: RestaurantInfo;
}> = (props) => {
    const [isError, setIsError] = useState<string | null>(null);
    const [address, setAddress] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const onSetAddress = (address: string) => {
        setAddress(address);
    };

    const onSetNumber = (phoneNumber: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(phoneNumber.target.value);
    };

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (address && address.trim().length === 0) {
            setIsError("Błąd! Podaj adres dostawy"!);
            return;
        }
        if (phoneNumber && phoneNumber.trim().length === 0) {
            setIsError("Błąd! Podaj numer telefonu!");
            return;
        }

        setIsLoading(true);
        db.ref(`orders`)
            .push({
                orderInfo: {
                    order: props.order,
                    restaurantInfo: props.restaurantInfo,
                },
                clientInfo: {
                    address: address,
                    phoneNumber: phoneNumber,
                },
                status: "active",
                responsibleCourier: "",
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
                <PlacesAutocompleteComponent onSetAddress={onSetAddress} />
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
