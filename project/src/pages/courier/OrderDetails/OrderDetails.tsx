import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import { orderActions } from "../../../store/order-slice";
import { OrderInfo } from "../../../types/OrderInfo";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import Map from "../../../components/GoogleMap/Map";
import classes from "./styles.module.css";

const OrderDetails: React.FC = () => {
    const params = useParams<{ id?: string }>();
    const { id } = params;

    const dispatch = useDispatch();

    const [order, setOrder] = useState<OrderInfo>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
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
                }
            })
            .catch((error) => {
                console.log("Failed to push user to Database!");
            });

        setIsLoading(false);
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
    };

    console.log(order);

    if (isLoading && !order) {
        return <LoadingSpinner />;
    } else if (!!order) {
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
                        <p>5 minut</p>
                        <h1>Czas dostarczenia</h1>
                        <p>5 minut</p>
                    </div>
                    <div className={classes.container}>
                        <h1>Średni czas przejazdu</h1>
                        <p> 10 minut</p>
                        <button onClick={acceptOrderHandler}>
                            Akceptuj zlecenie
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>No details</h1>;
    }
};

export default OrderDetails;
