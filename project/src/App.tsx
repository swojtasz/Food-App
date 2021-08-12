import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./config/firebase";

import Layout from "./components/layout/Layout/Layout";
import AuthRoute from "./routes/AuthRoute";
import { RootState } from "./store";
import { authActions } from "./store/auth-slice";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import ClientRoute from "./routes/ClientRoute";
import CourierRoute from "./routes/CourierRoute";
import RestaurantRoute from "./routes/RestaurantRoute";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const userType = useSelector((state: RootState) => state.auth.userType);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            dispatch(authActions.setUserType(auth.currentUser?.displayName));
            dispatch(authActions.setIsLoading(false));
        });
    }, [dispatch]);

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            {!isLoading && !auth.currentUser && <AuthRoute />}
            {!isLoading &&
                !!auth.currentUser &&
                userType !== "client" &&
                userType !== "courier" && <RestaurantRoute />}
            {!isLoading && !!auth.currentUser && userType === "client" && (
                <ClientRoute />
            )}
            {!isLoading && !!auth.currentUser && userType === "courier" && (
                <CourierRoute />
            )}
        </Layout>
    );
}

export default App;
