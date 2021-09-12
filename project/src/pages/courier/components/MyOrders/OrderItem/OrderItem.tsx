import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { db } from "../../../../../config/firebase";
import { orderActions } from "../../../../../store/order-slice";
import { OrderInfo } from "../../../../../types/OrderInfo";
import Button from "../../../../../components/Button/Button";

const OrderItem: React.FC<{ order: OrderInfo }> = (props) => {
    const dispatch = useDispatch();

    const orderAcceptHandler = () => {
        db.ref(`orders/${props.order.id}`)
            .update({
                status: "done",
            })
            .catch((error) => {
                console.log("Failed to push user to Database!");
            });
        dispatch(orderActions.setRefetchList(true));
    };

    return (
        <div className={classes.orderItem}>
            <div className={classes.headers}>
                <div className={classes.container}>
                    <h1>Miejsce odbioru</h1>
                    <p>
                        {props.order.orderInfo.restaurantInfo.restaurantAddress}
                    </p>
                </div>
                <div className={classes.container}>
                    <h1>Miejsce docelowe</h1>
                    <p>{props.order.clientInfo.address}</p>
                </div>
                <div className={classes.container}>
                    <Button onClick={orderAcceptHandler}>
                        Zakończ zlecenie
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
