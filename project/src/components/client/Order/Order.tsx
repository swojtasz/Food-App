import classes from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const Order: React.FC = () => {
    const dispatch = useDispatch();
    const [isCheckouting, setIsCheckouting] = useState<boolean>(false);

    const totalCost = useSelector((state: RootState) => state.order.totalPrice);
    const ordersArray = useSelector((state: RootState) => state.order.order);

    const orders = ordersArray.map((item) => {
        return (
            <li key={item.name}>
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
                        closePopup={handleClosePopup}
                    />
                )}

                {!isCheckouting && (
                    <div className={classes.bottom}>
                        <>
                            <button
                                onClick={handleClosePopup}
                                style={{ backgroundColor: "darkred" }}
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
