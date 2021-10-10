import classes from "./styles.module.scss";
import { useEffect, useState } from "react";
import OrderList from "../components/Orders/OrderList/OrderList";
import { db } from "../../../config/firebase";
import { OrderInfo } from "../../../types/OrderInfo";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import AvailableOrdersMap from "../../../components/GoogleMap/AvailableOrdersMap";
import AddressToCoordinates from "../../../utils/AddressToCoordinates";

const Orders: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<OrderInfo[]>([]);
    const [orderMarkers, setOrderMarkers] = useState<
        google.maps.LatLngLiteral[]
    >([]);

    const refetch = useSelector((state: RootState) => state.order.refetchList);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCoordinates = async (orderMarkersArray: string[]) => {
            setOrderMarkers(await AddressToCoordinates(orderMarkersArray));
            setIsLoading(false);
        };

        db.ref("orders")
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const ordersArray: OrderInfo[] = [];
                    const orderMarkersArray: string[] = [];
                    for (const orderKey in snapshot.val()) {
                        ordersArray.push({
                            orderInfo: snapshot.val()[orderKey].orderInfo,
                            clientInfo: snapshot.val()[orderKey].clientInfo,
                            id: orderKey,
                            status: snapshot.val()[orderKey].status,
                        });
                        if (
                            snapshot.val()[orderKey].status === "active" &&
                            !orderMarkersArray.includes(
                                snapshot.val()[orderKey].orderInfo
                                    .restaurantInfo.restaurantAddress
                            )
                        ) {
                            orderMarkersArray.push(
                                snapshot.val()[orderKey].orderInfo
                                    .restaurantInfo.restaurantAddress
                            );
                        }
                    }
                    setOrders(ordersArray);
                    setCoordinates(orderMarkersArray);
                    dispatch(orderActions.setRefetchList(false));
                }
            })
            .catch((error) => {
                dispatch(orderActions.setRefetchList(false));
                setIsLoading(false);
                console.log(error);
            });
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
                <AvailableOrdersMap orderMarkers={orderMarkers} />
            </div>
        );
    } else {
        return <h1>Brak możliwych zleceń do przyjęcia</h1>;
    }
};

export default Orders;
