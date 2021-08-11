import classes from "./styles.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../../store";
import ShowMenuItem from "../ShowMenuItem/ShowMenuItem";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import { db } from "../../../config/firebase";

type MenuItem = {
    name: string;
    description: string;
    price: string;
};

const ShowMenu: React.FC = () => {
    const restaurantName = useSelector(
        (state: RootState) => state.auth.userType
    );

    const dispatch = useDispatch();

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const database = db.ref();

        console.log("aa");

        database
            .child(`users/restaurant/${restaurantName}/menu`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const menuArray: MenuItem[] = [];
                    for (const key in snapshot.val()) {
                        menuArray.push({
                            name: key,
                            description: snapshot.val()[key].description,
                            price: snapshot.val()[key].price,
                        });
                    }
                    setMenu(menuArray);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [restaurantName, dispatch]);

    let menuList: JSX.Element | JSX.Element[] = <LoadingSpinner />;

    let index = 0;

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (menu.length !== 0) {
        menuList = menu.map((item) => {
            index++;
            return <ShowMenuItem key={item.name} item={item} index={index} />;
        });
        return (
            <div className={classes.meals}>
                <ul>{menuList}</ul>
            </div>
        );
    } else {
        return (
            <div className={classes.meals}>
                <p>No items found, add something!</p>
                <Link to="/addMenuItem">Add menu item</Link>
            </div>
        );
    }
};

export default ShowMenu;
