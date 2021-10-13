import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./config/firebase";

import Layout from "./components/Layout/Layout";
import AuthRoute from "./routes/AuthRoute";
import { RootState } from "./store";
import { authActions } from "./store/auth-slice";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ClientRoute from "./routes/ClientRoute";
import CourierRoute from "./routes/CourierRoute";
import RestaurantRoute from "./routes/RestaurantRoute";
import { orderActions } from "./store/order-slice";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const userType = useSelector((state: RootState) => state.auth.userType);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref(`users/${user!.uid}`)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            dispatch(
                                authActions.setUserType(snapshot.val().userType)
                            );
                            localStorage.setItem("userId", user!.uid);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            dispatch(authActions.setIsLoading(false));
            dispatch(orderActions.reset());
        });

        return unsubscribe;
    }, [dispatch]);

    return (
        <Layout>
            {isLoading && <LoadingSpinner />}
            {!isLoading && !auth.currentUser && <AuthRoute />}
            {!isLoading && !!auth.currentUser && userType === "restaurant" && (
                <RestaurantRoute />
            )}
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
