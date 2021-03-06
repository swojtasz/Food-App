import classes from "./styles.module.scss";
import { OrderInfo } from "../../../../../types/OrderInfo";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import OrderItem from "../OrderItem/OrderItem";

const OrderList: React.FC<{ orderList: OrderInfo[] }> = (props) => {
    const orders = props.orderList
        .filter((item) => {
            return item.status === "active";
        })
        .map((item, itemIdx) => {
            return (
                <li key={itemIdx}>
                    <OrderItem order={item} />
                </li>
            );
        });

    if (!orders) {
        return <LoadingSpinner />;
    } else {
        return (
            <div className={classes.orderList}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <h1>Miejsce odbioru</h1>
                    </div>
                    <div className={classes.header}>
                        <h1>Miejsce docelowe</h1>
                    </div>
                </div>
                <ul>{orders}</ul>
            </div>
        );
    }
};

export default OrderList;
