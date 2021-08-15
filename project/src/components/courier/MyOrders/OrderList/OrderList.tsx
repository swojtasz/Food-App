import { OrderInfo } from "../../../../types/OrderInfo";
import LoadingSpinner from "../../../../UI/LoadingSpinner/LoadingSpinner";
import OrderItem from "../OrderItem/OrderItem";
import classes from "./styles.module.css";

const OrderList: React.FC<{ orderList: OrderInfo[] }> = (props) => {
    const orders = props.orderList.map((item) => {
        return (
            <li key={item.id}>
                <OrderItem order={item} />
            </li>
        );
    });

    console.log(props.orderList);

    if (!orders) {
        return <LoadingSpinner />;
    } else {
        return (
            <div className={classes.orderList}>
                <ul>{orders}</ul>
            </div>
        );
    }
};

export default OrderList;