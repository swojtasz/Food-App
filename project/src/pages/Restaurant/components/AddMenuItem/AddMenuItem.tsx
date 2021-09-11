import classes from "./styles.module.scss";
import AddMenuItemForm from "../AddMenuItemForm/AddMenuItemForm";

const AddMenuItem: React.FC = () => {
    return (
        <div className={classes.menu}>
            <h1>Dodaj nowe danie do menu</h1>
            <AddMenuItemForm />
        </div>
    );
};

export default AddMenuItem;
