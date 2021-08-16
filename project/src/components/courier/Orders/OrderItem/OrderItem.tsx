import { Link } from "react-router-dom";
import { OrderInfo } from "../../../../types/OrderInfo";
import classes from "./styles.module.css";

const OrderItem: React.FC<{ order: OrderInfo }> = (props) => {
    return (
        <div className={classes.orderItem}>
            <div className={classes.headers}>
                <div className={classes.container}>
                    <h1>Miejsce odbioru</h1>
                    <p>
                        {props.order.orderInfo.restaurantInfo.restaurantAddress}
                    </p>
                    <h1>Miejsce docelowe</h1>
                    <p>{props.order.clientInfo.address}</p>
                </div>
                <div className={classes.container}>
                    <h1>Czas odbioru</h1>
                    <p>5 minut</p>
                    <h1>Czas dostarczenia</h1>
                    <p>5 minut</p>
                </div>
                <div className={classes.container}>
                    <h1>Średni czas przejazdu</h1>
                    <p> 10 minut</p>
                    <Link to={`myOrders/${props.order.id}`}>
                        Szczegóły zlecenia
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
