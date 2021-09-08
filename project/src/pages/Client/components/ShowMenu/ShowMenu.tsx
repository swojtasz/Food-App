import classes from "./styles.module.scss";

import { Link } from "react-router-dom";

import { Restaurant } from "../../../../types/Restaurant";

const ShowMenu: React.FC<{ restaurants: Restaurant[] }> = (props) => {
    let restaurantNames;

    restaurantNames = props.restaurants.map((item, itemIdx) => {
        return (
            <li key={itemIdx}>
                <Link to={`/showMenuItem/${item.id}`}>{item.name}</Link>
            </li>
        );
    });
    return (
        <section className={classes.meals}>
            <h1>Wybierz restaurację:</h1>
            <ul>{restaurantNames}</ul>
        </section>
    );
};

export default ShowMenu;
