import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MyOrders from "../pages/courier/MyOrders";
import OrderDetails from "../pages/courier/OrderDetails/OrderDetails";
import Orders from "../pages/courier/Orders";
import CourierView from "../pages/main-views/CourierView/CourierView";

const CourierRoute: React.FC = (props) => {
    return (
        <Switch>
            <Route path="/" exact>
                <CourierView />
            </Route>
            <Route path="/myOrders" exact>
                <MyOrders />
            </Route>
            <Route path="/orders/:id" exact>
                <OrderDetails />
            </Route>
            <Route path="/orders">
                <Orders />
            </Route>
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};

export default CourierRoute;
