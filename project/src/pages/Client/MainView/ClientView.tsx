import { useState } from "react";
import { useEffect } from "react";

import { Menu } from "../../../types/Menu";
import { Restaurant } from "../../../types/Restaurant";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ShowMenu from "../components/ShowMenu/ShowMenu";
import { db } from "../../../config/firebase";

const ClientView: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        setIsLoading(true);

        db.ref("menu")
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const restaurantArray: Restaurant[] = [];
                    for (const restaurantKey in snapshot.val()) {
                        const menuArray: Menu[] = [];
                        for (const dishKey in snapshot.val()[restaurantKey]
                            .menu) {
                            menuArray.push(
                                snapshot.val()[restaurantKey].menu[dishKey]
                            );
                        }
                        restaurantArray.push({
                            name: snapshot.val()[restaurantKey].info
                                .restaurantName,
                            id: restaurantKey,
                            menu: menuArray,
                        });
                    }
                    setRestaurants(restaurantArray);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {!isLoading && restaurants.length !== 0 && (
                <ShowMenu restaurants={restaurants} />
            )}
        </>
    );
};

export default ClientView;
