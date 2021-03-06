import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ShowMenuItemComponent from "../components/ShowMenuItem/ShowMenuItem";
import { db } from "../../../config/firebase";
import { Menu } from "../../../types/Menu";
import { RestaurantInfo } from "../../../types/RestaurantInfo";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ShowMenuItem: React.FC = () => {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>();
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams<{ id?: string }>();
    const { id } = params;

    useEffect(() => {
        setIsLoading(true);

        db.ref(`menu/${id}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const menuArray: Menu[] = [];
                    for (const dishKey in snapshot.val().menu) {
                        menuArray.push(snapshot.val().menu[dishKey]);
                    }
                    setMenu(menuArray);
                    setRestaurantInfo(snapshot.val().info);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
    }

    if (!isLoading && menu.length !== 0 && restaurantInfo) {
        return (
            <ShowMenuItemComponent
                item={menu}
                restaurantInfo={restaurantInfo}
            />
        );
    } else {
        return <LoadingSpinner />;
    }
};

export default ShowMenuItem;
