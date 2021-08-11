import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/login/Login";
import NotLoggedView from "../pages/main-views/NotLoggedView/NotLoggedView";
import Register from "../pages/registration/Register/Register";
import RegisterClient from "../pages/registration/RegisterClient/RegisterClient";
import RegisterCourier from "../pages/registration/RegisterCourier/RegisterCourier";
import RegisterRestaurant from "../pages/registration/RegisterRestaurant/RegisterRestaurant";

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
