import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { auth } from "./config/firebase";

import Layout from "./components/layout/Layout/Layout";
import AuthRoute from "./routes/AuthRoute";
import { RootState } from "./store";
import { authActions } from "./store/auth-slice";
import { loadingActions } from "./store/loading-slice";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import ClientRoute from "./routes/ClientRoute";
import CourierRoute from "./routes/CourierRoute";
import RestaurantRoute from "./routes/RestaurantRoute";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );
    const userType = useSelector((state: RootState) => state.auth.userType);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            dispatch(authActions.setUserType(auth.currentUser?.displayName));
            dispatch(loadingActions.setIsLoading(false));
        });
    }, [dispatch]);

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <Switch>
                    {!auth.currentUser && <AuthRoute />}
                    {auth.currentUser && userType === "client" && (
                        <ClientRoute />
                    )}
                    {auth.currentUser && userType === "courier" && (
                        <CourierRoute />
                    )}
                    {auth.currentUser &&
                        userType !== "client" &&
                        userType !== "courier" && <RestaurantRoute />}
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            )}
        </Layout>
    );
}

export default App;
