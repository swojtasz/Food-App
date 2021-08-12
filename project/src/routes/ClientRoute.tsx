import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ShowMenuItem from "../pages/client/ShowMenuItem";
import ClientView from "../pages/main-views/ClientView/ClientView";

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
