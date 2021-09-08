import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login/Login";
import NotLoggedView from "../pages/NotLoggedView/NotLoggedView";
import Register from "../pages/Registration/Register/Register";
import RegisterClient from "../pages/Registration/RegisterClient/RegisterClient";
import RegisterCourier from "../pages/Registration/RegisterCourier/RegisterCourier";
import RegisterRestaurant from "../pages/Registration/RegisterRestaurant/RegisterRestaurant";

const AuthRoute: React.FC = (props) => {
    return (
        <Switch>
            <Route path="/" exact>
                <NotLoggedView />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Route path="/register/client" exact>
                <RegisterClient />
            </Route>
            <Route path="/register/courier" exact>
                <RegisterCourier />
            </Route>
            <Route path="/register/restaurant" exact>
                <RegisterRestaurant />
            </Route>
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};

export default AuthRoute;
