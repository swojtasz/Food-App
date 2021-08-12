import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import ShowMenuItemComponent from "../../components/client/ShowMenuItem/ShowMenuItem";
import { db } from "../../config/firebase";
import { Menu } from "../../types/Menu";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const ShowMenuItem: React.FC = () => {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const params = useParams<{ id?: string }>();
    const { id } = params;

    useEffect(() => {
        setIsLoading(true);

        const database = db.ref();

        database
            .child(`users/restaurant/${id}/menu`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const menuArray: Menu[] = [];
                    for (const dishKey in snapshot.val()) {
                        menuArray.push(snapshot.val()[dishKey]);
                    }
                    setMenu(menuArray);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [dispatch, id]);

    if (isLoading) {
    }

    if (!isLoading && menu.length !== 0) {
        return <ShowMenuItemComponent item={menu} />;
    } else {
        return <LoadingSpinner />;
    }
};

export default ShowMenuItem;
