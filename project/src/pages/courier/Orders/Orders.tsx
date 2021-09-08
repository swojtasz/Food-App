import classes from "./styles.module.scss";
import { useEffect, useState } from "react";
import OrderList from "../components/Orders/OrderList/OrderList";
import { db } from "../../../config/firebase";
import { OrderInfo } from "../../../types/OrderInfo";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";

const Orders: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<OrderInfo[]>([]);

    const refetch = useSelector((state: RootState) => state.order.refetchList);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);

        db.ref("orders")
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const ordersArray: OrderInfo[] = [];
                    for (const orderKey in snapshot.val()) {
                        ordersArray.push({
                            orderInfo: snapshot.val()[orderKey].orderInfo,
                            clientInfo: snapshot.val()[orderKey].clientInfo,
                            id: orderKey,
                            status: snapshot.val()[orderKey].status,
                        });
                    }
                    setOrders(ordersArray);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });

        dispatch(orderActions.setRefetchList(false));
    }, [refetch, dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (orders.length !== 0) {
        return (
            <div className={classes.orders}>
                <h1 className={classes.header}>
                    Zlecenia możliwe do przyjęcia
                </h1>
                <OrderList orderList={orders} />
            </div>
        );
    } else {
        return (
            <h1 style={{ color: "white" }}>
                Brak możliwych zleceń do przyjęcia
            </h1>
        );
    }
};

export default Orders;
