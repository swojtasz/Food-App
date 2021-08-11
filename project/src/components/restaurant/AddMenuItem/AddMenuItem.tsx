import classes from "./styles.module.css";
import AddMenuItemForm from "../AddMenuItemForm/AddMenuItemForm";
import { useState } from "react";
import AddMenuItemPopup from "../AddMenuItemPopup/AddMenuItemPopup";

const AddMenuItem: React.FC = () => {
    const [isPopup, setIsPopup] = useState<boolean>(false);

    const onClosePopup = () => {
        setIsPopup(false);
    };

    const setPopup = () => {
        setIsPopup(true);
    };

    return (
        <div className={classes.menu}>
            {isPopup && <AddMenuItemPopup onClosePopup={onClosePopup} />}

            <h1>Dodaj nowe danie do menu</h1>
            <AddMenuItemForm setPopup={setPopup} />
        </div>
    );
};

export default AddMenuItem;
