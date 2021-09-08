import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RestaurantView from "../pages/Restaurant/MainView/RestaurantView";
import AddMenuItem from "../pages/Restaurant/AddMenuItem/AddMenuItem";
import ShowMenu from "../pages/Restaurant/ShowMenu/ShowMenu";

const RestaurantRoute: React.FC = (props) => {
    return (
        <Switch>
            <Route path="/" exact>
                <RestaurantView />
            </Route>
            <Route path="/addMenuItem" exact>
                <AddMenuItem />
            </Route>
            <Route path="/showMenu" exact>
                <ShowMenu />
            </Route>
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};

export default RestaurantRoute;
