import classes from "./styles.module.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { auth, db } from "../../../config/firebase";
import { loadingActions } from "../../../store/loading-slice";

const AddMenuItemForm: React.FC<{ setPopup: () => void }> = (props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const dispatch = useDispatch();

    const onSetName = (name: React.ChangeEvent<HTMLInputElement>) => {
        setName(name.target.value);
    };
    const onSetDescription = (
        description: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(description.target.value);
    };
    const onSetPrice = (price: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(price.target.value);
    };

    const [isError, setIsError] = useState<string | null>(null);

    const restaurantName = useSelector(
        (state: RootState) => state.auth.userType
    );

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(loadingActions.setIsLoading(true));
        const database = db.ref();

        database
            .child(`users/restaurant/${restaurantName}/menu/${name}`)
            .set({
                name: name,
                description: description,
                price: price,
            })
            .catch((error) => {
                setIsError(error.message);
                console.log(error);
            });

        dispatch(loadingActions.setIsLoading(false));

        if (isError === null) {
            props.setPopup();
        }

        setName("");
        setDescription("");
        setPrice("");
    };

    return (
        <>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <label htmlFor="name">Nazwa Dania</label>
                <input
                    type="text"
                    id="name"
                    onChange={onSetName}
                    value={name}
                />
                <label htmlFor="description">Opis dania</label>
                <input
                    type="text"
                    id="description"
                    onChange={onSetDescription}
                    value={description}
                />
                <label htmlFor="price">Cena</label>
                <input
                    type="text"
                    id="price"
                    onChange={onSetPrice}
                    value={price}
                />
                <button type="submit">Dodaj</button>
            </form>
        </>
    );
};

export default AddMenuItemForm;
