import classes from "./styles.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ShowMenuItem from "../ShowMenuItem/ShowMenuItem";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import { auth, db } from "../../../config/firebase";
import { Menu } from "../../../types/Menu";

const ShowMenu: React.FC = () => {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        db.ref(`menu/${auth.currentUser?.uid}/menu`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const menuArray: Menu[] = [];
                    for (const key in snapshot.val()) {
                        menuArray.push({
                            name: key,
                            description: snapshot.val()[key].description,
                            price: snapshot.val()[key].price,
                        });
                    }
                    setMenu(menuArray);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setIsLoading(false);
    }, []);

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
