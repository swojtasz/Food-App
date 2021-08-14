import classes from "./styles.module.css";
import { useEffect, useState } from "react";
import OrderList from "../../components/courier/OrderList/OrderList";
import { db } from "../../config/firebase";
import { OrderInfo } from "../../types/OrderInfo";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { orderActions } from "../../store/order-slice";

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
                }
            })
            .catch((error) => {
                console.log(error);
            });

        setIsLoading(false);
        dispatch(orderActions.setRefetchList(false));
    }, [refetch, dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (orders.length !== 0) {
        return (
            <div className={classes.orders}>
                <h1>Zlecenia możliwe do przyjęcia</h1>
                <OrderList orderList={orders} />
            </div>
        );
    } else {
        return <h1>Brak możliwych zleceń do przyjęcia</h1>;
    }
};

export default Orders;
