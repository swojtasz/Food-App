import React from "react";
import { Route } from "react-router-dom";
import RestaurantView from "../pages/main-views/RestaurantView/RestaurantView";
import AddMenuItem from "../pages/restaurant/AddMenuItem";
import ShowMenu from "../pages/restaurant/ShowMenu";

const RestaurantRoute: React.FC = (props) => {
    return (
        <>
            <Route path="/" exact>
                <RestaurantView />
            </Route>
            <Route path="/addMenuItem" exact>
                <AddMenuItem />
            </Route>
            <Route path="/showMenu" exact>
                <ShowMenu />
            </Route>
        </>
    );
};

export default RestaurantRoute;
