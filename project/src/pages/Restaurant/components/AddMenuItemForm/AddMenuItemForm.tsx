import classes from "./styles.module.scss";

import { useState } from "react";
import { auth, db } from "../../../../config/firebase";

const AddMenuItemForm: React.FC<{ setPopup: () => void }> = (props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

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

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        db.ref(`menu/${auth.currentUser?.uid}/menu/${name}`)
            .set({
                name: name,
                description: description,
                price: price,
            })
            .catch((error) => {
                setIsError(error.message);
                console.log(error);
            });

        setIsLoading(false);

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
                <button type="submit" disabled={isLoading}>
                    Dodaj
                </button>
            </form>
        </>
    );
};

export default AddMenuItemForm;
