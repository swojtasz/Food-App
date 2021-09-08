import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ShowMenuItem from "../pages/Client/ShowMenuItem/ShowMenuItem";
import ClientView from "../pages/Client/MainView/ClientView";

const ClientRoute: React.FC = (props) => {
    return (
        <Switch>
            <Route path="/" exact>
                <ClientView />
            </Route>
            <Route path="/showMenuItem/:id">
                <ShowMenuItem />
            </Route>
            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};

export default ClientRoute;
