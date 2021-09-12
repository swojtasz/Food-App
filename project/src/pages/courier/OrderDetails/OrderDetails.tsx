import classes from "./styles.module.scss";

import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import { orderActions } from "../../../store/order-slice";
import { OrderInfo } from "../../../types/OrderInfo";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Map from "../../../components/GoogleMap/SingleOrderMap";
import AddressToCoordinates from "../../../utils/AddressToCoordinates";
import Button from "../../../components/Button/Button";
import { RootState } from "../../../store";

const OrderDetails: React.FC = () => {
    const params = useParams<{ id?: string }>();
    const { id } = params;
    const history = useHistory();

    const dispatch = useDispatch();

    const courierToRestaurantTime = useSelector(
        (state: RootState) => state.durations.courierToRestaurantTime
    );
    const restaurantToClientTime = useSelector(
        (state: RootState) => state.durations.restaurantToClientTime
    );

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<OrderInfo>();
    const [restaurantLatLng, setRestaurantLatLng] =
        useState<google.maps.LatLngLiteral>();
    const [clientLatLng, setClientLatLng] =
        useState<google.maps.LatLngLiteral>();

    useEffect(() => {
        const setCoordinates = async (
            restaurantAddress: string,
            clientAddress: string
        ) => {
            const restaurant = await AddressToCoordinates([restaurantAddress]);
            const client = await AddressToCoordinates([clientAddress]);

            setRestaurantLatLng(restaurant[0]);
            setClientLatLng(client[0]);
            setIsLoading(false);
        };

        db.ref(`orders/${id}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setOrder({
                        orderInfo: snapshot.val().orderInfo,
                        clientInfo: snapshot.val().clientInfo,
                        status: snapshot.val().status,
                        id: snapshot.val().id,
                    });
                    setCoordinates(
                        snapshot.val().orderInfo.restaurantInfo
                            .restaurantAddress,
                        snapshot.val().clientInfo.address
                    );
                }
            })
            .catch((error) => {
                console.log("Failed to push user to Database!");
                setIsLoading(false);
            });
    }, [id]);

    const acceptOrderHandler = () => {
        db.ref(`orders/${id}`)
            .update({
                status: "in progress",
                responsibleCourier: auth.currentUser?.uid,
            })
            .catch((error) => {
                console.log("Failed to push user to Database!");
            });
        dispatch(orderActions.setRefetchList(true));
        history.push("/orders");
    };

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (!!order && !!restaurantLatLng && !!clientLatLng) {
        return (
            <div className={classes.orderItem}>
                <div className={classes.headers}>
                    <div className={classes.container}>
                        <h1>Miejsce odbioru</h1>
                        <p>
                            {order!.orderInfo.restaurantInfo.restaurantAddress}
                        </p>
                        <h1>Miejsce docelowe</h1>
                        <p>{order!.clientInfo.address}</p>
                    </div>
                    <div className={classes.container}>
                        <h1>Czas odbioru</h1>
                        <p>{courierToRestaurantTime} minut</p>
                        <h1>Czas dostarczenia</h1>
                        <p>{restaurantToClientTime} minut</p>
                    </div>
                    <div className={classes.container}>
                        <h1>Średni czas przejazdu</h1>
                        <p>
                            {courierToRestaurantTime + restaurantToClientTime}{" "}
                            minut
                        </p>
                        <Button onClick={acceptOrderHandler}>
                            Akceptuj zlecenie
                        </Button>
                    </div>
                </div>
                <Map
                    restaurantMarker={restaurantLatLng}
                    clientMarker={clientLatLng}
                />
            </div>
        );
    } else {
        return <h1>No details</h1>;
    }
};

export default OrderDetails;
