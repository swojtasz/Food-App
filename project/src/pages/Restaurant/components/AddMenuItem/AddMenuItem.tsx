import classes from "./styles.module.scss";
import AddMenuItemForm from "../AddMenuItemForm/AddMenuItemForm";
import { useState } from "react";

const AddMenuItem: React.FC = () => {
    const [isPopup, setIsPopup] = useState<boolean>(false);

    const setPopup = () => {
        setIsPopup(true);
    };

    return (
        <div className={classes.menu}>
            <h1>Dodaj nowe danie do menu</h1>
            <AddMenuItemForm setPopup={setPopup} />
            {isPopup && <p>Pomyślnie dodano pozycję do menu!</p>}
        </div>
    );
};

export default AddMenuItem;
