import classes from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { useState } from "react";
import { useEffect } from "react";

const OrderButton: React.FC = () => {
    const dispatch = useDispatch();
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const totalPrice = useSelector(
        (state: RootState) => state.order.totalPrice
    );
    const isPopup = useSelector((state: RootState) => state.order.popup);

    useEffect(() => {
        if (totalPrice === 0) {
            return;
        }

        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [totalPrice]);

    const setPopupToTrue = () => {
        dispatch(orderActions.setPopup(true));
    };

    const btnClasses = `${classes.orderButton} ${
        btnIsHighlighted ? classes.bump : ""
    } ${isPopup ? classes.hide : ""}`;

    return (
        <div className={btnClasses}>
            <button onClick={setPopupToTrue}>Koszyk: {totalPrice}zł</button>
        </div>
    );
};

export default OrderButton;