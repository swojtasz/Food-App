import classes from "./styles.module.scss";

import { useState } from "react";
import { auth, db } from "../../../../config/firebase";
import Button from "../../../../components/Button/Button";

const AddMenuItemForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState<null | string>(null);

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

    const formSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        if (
            name.trim().length === 0 ||
            description.trim().length === 0 ||
            price.trim().length === 0 ||
            !price.match(/^[0-9]+$/)
        ) {
            setError("Nie udało się dodać zamówienia");
            return;
        }

        db.ref(`menu/${auth.currentUser?.uid}/menu/${name}`)
            .set({
                name: name,
                description: description,
                price: price,
            })
            .catch((error) => {
                console.log(error);
            });

        setIsLoading(false);

        setName("");
        setDescription("");
        setPrice("");
        setIsAdded(true);
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
                <Button type="submit" disabled={isLoading}>
                    Dodaj
                </Button>
                {isAdded && <p>Pomyślnie dodano zamówienie!</p>}
                {error && <p className={classes.error}>{error}</p>}
            </form>
        </>
    );
};

export default AddMenuItemForm;
