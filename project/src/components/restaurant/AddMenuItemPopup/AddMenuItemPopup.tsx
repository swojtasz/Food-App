import classes from "./styles.module.css";

const AddMenuItemPopup: React.FC<{ onClosePopup: () => void }> = (props) => {
    const handleClosePopup = () => {
        props.onClosePopup();
    };

    return (
        <div className={classes.modal} onClick={handleClosePopup}>
            <div className={classes.modalContent}>
                <p className="close">Pomyślnie dodano zamówienie!</p>
                <button onClick={handleClosePopup}>Zamknij</button>
            </div>
        </div>
    );
};

export default AddMenuItemPopup;
