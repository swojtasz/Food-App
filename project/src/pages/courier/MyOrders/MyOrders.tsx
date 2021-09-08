import classes from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../config/firebase";
import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { OrderInfo } from "../../../types/OrderInfo";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import OrderList from "../components/MyOrders/OrderList/OrderList";
import MyOrdersMap from "../../../components/GoogleMap/MyOrdersMap";
import AddressToCoordinates from "../../../utils/AddressToCoordinates";

const MyOrders: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState<OrderInfo[]>([]);
    const [restaurantMarkers, setRestaurantMarkers] = useState<
        google.maps.LatLngLiteral[]
    >([]);
    const [clientMarkers, setClientMarkers] = useState<
        google.maps.LatLngLiteral[]
    >([]);

    const refetch = useSelector((state: RootState) => state.order.refetchList);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCoordinates = async (
            restaurantAddress: string[],
            clientAddress: string[]
        ) => {
            setRestaurantMarkers(await AddressToCoordinates(restaurantAddress));
            setClientMarkers(await AddressToCoordinates(clientAddress));
            setIsLoading(false);
        };

        db.ref("orders")
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const ordersArray: OrderInfo[] = [];
                    const restaurantArray: string[] = [];
                    const clientArray: string[] = [];
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
                            restaurantArray.push(
                                snapshot.val()[orderKey].orderInfo
                                    .restaurantInfo.restaurantAddress
                            );
                            clientArray.push(
                                snapshot.val()[orderKey].clientInfo.address
                            );
                        }
                    }

                    setFilteredOrders(ordersArray);
                    setCoordinates(restaurantArray, clientArray);
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
    } else if (filteredOrders.length !== 0) {
        return (
            <div className={classes.orders}>
                <h1 className={classes.header}>Aktualne zlecenia:</h1>
                <OrderList orderList={filteredOrders} />
                <MyOrdersMap
                    restaurantMarkers={restaurantMarkers}
                    clientMarkers={clientMarkers}
                />
            </div>
        );
    } else {
        return <h1>Brak możliwych zleceń do przyjęcia</h1>;
    }
};

export default MyOrders;
