import classes from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { RestaurantInfo } from "../../../types/RestaurantInfo";

const Order: React.FC<{ restaurantInfo: RestaurantInfo }> = (props) => {
    const dispatch = useDispatch();
    const [isCheckouting, setIsCheckouting] = useState<boolean>(false);

    const totalCost = useSelector((state: RootState) => state.order.totalPrice);
    const ordersArray = useSelector((state: RootState) => state.order.order);

    const orders = ordersArray.map((item, itemIdx) => {
        return (
            <li key={itemIdx}>
                <p>{item.name}</p>
                <p>{item.quantity}</p>
            </li>
        );
    });

    const handleClosePopup = () => {
        dispatch(orderActions.setPopup(false));
    };

    const handleCheckout = () => {
        setIsCheckouting(true);
    };

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <h3>Twoje zamówienie: </h3>
                <div className={classes.helper}>
                    <p>Nazwa</p>
                    <p>Ilość</p>
                </div>
                <ul>{orders}</ul>
                {isCheckouting && (
                    <CheckoutForm
                        order={ordersArray}
                        restaurantInfo={props.restaurantInfo}
                        closePopup={handleClosePopup}
                    />
                )}

                {!isCheckouting && (
                    <div className={classes.bottom}>
                        <>
                            <button
                                onClick={handleClosePopup}
                                style={{
                                    backgroundColor: "red",
                                }}
                            >
                                Anuluj
                            </button>
                            <button onClick={handleCheckout}>
                                Zamów: {totalCost}zł
                            </button>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
