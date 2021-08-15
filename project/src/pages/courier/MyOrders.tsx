import classes from "./styles.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../config/firebase";
import { RootState } from "../../store";
import { orderActions } from "../../store/order-slice";
import { OrderInfo } from "../../types/OrderInfo";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import OrderList from "../../components/courier/MyOrders/OrderList/OrderList";

const MyOrders: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState<OrderInfo[]>([]);

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
                        if (
                            snapshot.val()[orderKey].responsibleCourier ===
                                auth.currentUser?.uid &&
                            snapshot.val()[orderKey].status === "in progress"
                        ) {
                            ordersArray.push({
                                orderInfo: snapshot.val()[orderKey].orderInfo,
                                clientInfo: snapshot.val()[orderKey].clientInfo,
                                id: orderKey,
                                status: snapshot.val()[orderKey].status,
                            });
                        }
                    }
                    setFilteredOrders(ordersArray);
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
    } else if (filteredOrders.length !== 0) {
        return (
            <div className={classes.orders}>
                <h1>Aktualne zlecenia:</h1>
                <OrderList orderList={filteredOrders} />
            </div>
        );
    } else {
        return <h1>Brak możliwych zleceń do przyjęcia</h1>;
    }
};

export default MyOrders;
