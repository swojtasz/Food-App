import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { db } from "../../../../config/firebase";
import { orderActions } from "../../../../store/order-slice";
import { OrderInfo } from "../../../../types/OrderInfo";

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
                    <button onClick={orderAcceptHandler}>
                        Zakończ zlecenie
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
