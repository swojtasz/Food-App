import classes from "./styles.module.css";

import { Link } from "react-router-dom";

const RestaurantView: React.FC = () => {
    return (
        <div className={classes.mainView}>
            <Link to="/addMenuItem">
                <h1>Dodaj danie</h1>
            </Link>
            <Link to="/showMenu">
                <h1>Wyświetl menu</h1>
            </Link>
        </div>
    );
};

export default RestaurantView;
