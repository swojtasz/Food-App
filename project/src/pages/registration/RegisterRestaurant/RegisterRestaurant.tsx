import classes from "./styles.module.css";

import { Link } from "react-router-dom";
import RestaurantForm from "../../../components/register/RestaurantForm/RestaurantForm";

const RegisterRestaurant: React.FC = (props) => {
    return (
        <div className={classes.register}>
            <h1>Rejestracja</h1>
            <RestaurantForm />
            <h3>Jesteś już zarejestrowany?</h3>
            <Link to="/login">Zaloguj się!</Link>
        </div>
    );
};

export default RegisterRestaurant;
