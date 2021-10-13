import { useState } from "react";
import { useHistory } from "react-router";
import { db } from "../../../../config/firebase";
import { Order } from "../../../../types/Order";
import { RestaurantInfo } from "../../../../types/RestaurantInfo";
import PlacesAutocompleteComponent from "../../../../components/GoogleMap/PlacesAutocomplete/PlacesAutocomplete";
import classes from "./styles.module.scss";
import Button from "../../../../components/Button/Button";

const CheckoutForm: React.FC<{
    closePopup: () => void;
    order: Order[];
    restaurantInfo: RestaurantInfo;
}> = (props) => {
    const [error, setError] = useState<string | null>(null);
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
        setError(null);

        if (
            !address ||
            !phoneNumber ||
            address.trim().length === 0 ||
            phoneNumber.trim().length === 0 ||
            !phoneNumber.match(/^[0-9]+$/)
        ) {
            console.log("siema");
            setError("Nie udało się złożyć zamówienia");
            return;
        }

        setIsLoading(true);
        db.ref(`orders/${localStorage.getItem("userId")}`)
            .update({
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
                setError(error.message);
                console.log(error);
            });

        setIsLoading(false);

        setAddress("");
        setPhoneNumber("");
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes.placesAutocomplete}>
                <label htmlFor="address">Adres dostawy:</label>
                <PlacesAutocompleteComponent onSetAddress={onSetAddress} />
            </div>
            <div className={classes.number}>
                <label htmlFor="number">Numer telefonu:</label>
                <input
                    type="text"
                    id="number"
                    onChange={onSetNumber}
                    value={phoneNumber}
                />
            </div>
            {error && <p className={classes.error}>{error}</p>}
            <div className={classes.bottom}>
                <Button
                    onClick={props.closePopup}
                    style={{
                        backgroundColor: "#bd0000",
                    }}
                >
                    Anuluj
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: "#006600" }}
                >
                    Potwierdź
                </Button>
            </div>
        </form>
    );
};

export default CheckoutForm;
