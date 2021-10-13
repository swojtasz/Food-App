import classes from "./styles.module.scss";

import { Link } from "react-router-dom";

import { Restaurant } from "../../../../types/Restaurant";
import { useEffect, useState } from "react";
import { db } from "../../../../config/firebase";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { OrderInfo } from "../../../../types/OrderInfo";

const ShowMenu: React.FC<{ restaurants: Restaurant[] }> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [myOrders, setMyOrders] = useState<OrderInfo>();

    useEffect(() => {
        setIsLoading(true);

        db.ref(`orders/${localStorage.getItem("userId")}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setMyOrders(snapshot.val());
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    const restaurantNames = props.restaurants.map((item, itemIdx) => {
        return (
            <li key={itemIdx}>
                <Link to={`/showMenuItem/${item.id}`}>{item.name}</Link>
            </li>
        );
    });

    if (isLoading) {
        return <LoadingSpinner />;
    } else {
        return (
            <div className={classes.orderInfo}>
                <section className={classes.meals}>
                    <h1>Wybierz restaurację:</h1>
                    <ul>{restaurantNames}</ul>
                </section>
                <section className={classes.meals}>
                    <h1>Twoje zamówienia:</h1>
                    <div className={classes.orderInfo}>
                        <h3>Restauracja</h3>
                        <h3>Status</h3>
                    </div>
                    {myOrders && (
                        <div className={classes.orderInfo}>
                            <p>
                                {
                                    myOrders.orderInfo.restaurantInfo
                                        .restaurantName
                                }
                            </p>
                            <p>{myOrders.status}</p>
                        </div>
                    )}
                </section>
            </div>
        );
    }
};

export default ShowMenu;
