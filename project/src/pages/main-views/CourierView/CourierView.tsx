import classes from "./styles.module.css";

import { Link } from "react-router-dom";

const CourierView: React.FC = () => {
    return (
        <div className={classes.mainView}>
            <Link to="/orders">
                <h1>Wyświetl dostępne zamówienia</h1>
            </Link>
            <Link to="/myOrders">
                <h1>Wyświetl moje aktualne zamówienia</h1>
            </Link>
        </div>
    );
};

export default CourierView;
