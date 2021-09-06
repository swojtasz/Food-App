import classes from "../styles.module.scss";

import { Link } from "react-router-dom";
import RestaurantForm from "../../../components/register/RestaurantForm/RestaurantForm";

const RegisterRestaurant: React.FC = (props) => {
    return (
        <div className={classes.register}>
            <h1>Rejestracja</h1>
            <RestaurantForm />
            <p>Jesteś już zarejestrowany?</p>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default RegisterRestaurant;
