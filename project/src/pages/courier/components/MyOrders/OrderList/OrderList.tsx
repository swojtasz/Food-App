import classes from "./styles.module.scss";
import { OrderInfo } from "../../../../../types/OrderInfo";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import OrderItem from "../OrderItem/OrderItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

const OrderList: React.FC<{ orderList: OrderInfo[] }> = (props) => {
    const orders = props.orderList.map((item, itemIdx) => {
        return (
            <li key={itemIdx}>
                <OrderItem order={item} />
            </li>
        );
    });

    const totalTime = useSelector(
        (state: RootState) => state.durations.myOrdersTotalDuration
    );

    if (!orders || totalTime === 0) {
        return <LoadingSpinner />;
    } else {
        return (
            <div className={classes.orderList}>
                <ul>{orders}</ul>
                <h3>Średni czas przejazdu: {totalTime} min</h3>
            </div>
        );
    }
};

export default OrderList;
