import classes from "./styles.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { Menu } from "../../../types/Menu";
import Order from "../Order/Order";
import OrderButton from "../OrderButton/OrderButton";

const ShowMenuItem: React.FC<{ item: Menu[] }> = (props) => {
    const dispatch = useDispatch();
    const isPopup = useSelector((state: RootState) => state.order.popup);

    useEffect(() => {
        dispatch(orderActions.reset());
    }, [dispatch]);

    const addItemHandler = (item: Menu) => {
        const itemToAdd = {
            name: item.name,
            price: +item.price,
        };
        dispatch(orderActions.addItem(itemToAdd));
    };
    const removeItemHandler = (item: Menu) => {
        const itemToRemove = {
            name: item.name,
            price: +item.price,
        };
        dispatch(orderActions.removeItem(itemToRemove));
    };

    let itemNumber = 0;

    const menu = props.item.map((item) => {
        itemNumber++;
        return (
            <li key={item.name}>
                <div className={classes.row}>
                    <h1>
                        {itemNumber}.{item.name}
                    </h1>
                    <p>{item.price}zł</p>
                </div>
                <div className={classes.row}>
                    <p className={classes.description}>{item.description}</p>
                    <div className={classes.buttons}>
                        <button onClick={addItemHandler.bind(null, item)}>
                            Dodaj do koszyka
                        </button>
                        <button onClick={removeItemHandler.bind(null, item)}>
                            Usuń
                        </button>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <>
            <OrderButton />
            <div className={classes.menu}>
                {isPopup && <Order />}
                <ul>{menu}</ul>
            </div>
        </>
    );
};

export default ShowMenuItem;
