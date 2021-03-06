import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import { OrderInfo } from "../../../../../types/OrderInfo";

const OrderItem: React.FC<{ order: OrderInfo }> = (props) => {
    return (
        <div className={classes.orderItem}>
            <div className={classes.headers}>
                <div className={classes.container}>
                    <p>
                        {props.order.orderInfo.restaurantInfo.restaurantAddress}
                    </p>
                </div>
                <div className={classes.container}>
                    <p>{props.order.clientInfo.address}</p>
                </div>
                <div className={classes.info}>
                    <Link to={`orders/${props.order.id}`}>Szczegóły</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
