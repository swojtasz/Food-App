import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout/Layout";

import { auth } from "./config/firebase";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register/Register";
import RegisterClient from "./pages/registration/RegisterClient/RegisterClient";
import RegisterCourier from "./pages/registration/RegisterCourier/RegisterCourier";
import RegisterRestaurant from "./pages/registration/RegisterRestaurant/RegisterRestaurant";
import { RootState } from "./store";
import { authActions } from "./store/auth-slice";
import { loadingActions } from "./store/loading-slice";

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const userType = useSelector((state: RootState) => state.auth.userType);

    // useEffect(() => {
    //     const getDatabaseProfile = () => {
    //         const database = db.ref();
    //         if (auth.currentUser) {
    //             database
    //                 .child("users/")
    //                 .child(`${auth.currentUser.displayName!}/`)
    //                 .child(auth.currentUser.uid)
    //                 .get()
    //                 .then((snapshot) => {
    //                     if (snapshot.exists()) {
    //                         dispatch(authActions.setUser(snapshot.val()));
    //                         dispatch(authActions.login());
    //                     }
    //                     dispatch(loadingActions.setIsLoading(false));
    //                 })
    //                 .catch((error: any) => {
    //                     console.error(error);
    //                 });
    //         }
    //     };

    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         getDatabaseProfile();
    //     } else {
    //         dispatch(loadingActions.setIsLoading(false));
    //     }
    // });
    // }, [dispatch]);

    auth.onAuthStateChanged((user) => {
        if (user) {
            if (auth.currentUser?.displayName === null) {
                auth.signOut();
                dispatch(loadingActions.setIsLoading(false));
                return;
            }
            dispatch(authActions.setUserType(auth.currentUser?.displayName));
            dispatch(authActions.login());
        }
        dispatch(loadingActions.setIsLoading(false));
    });

    const isNotLogged = !isLoggedIn && (
        <Switch>
            <Route path="/login" exact>
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
        </Switch>
    );

    return (
        <Layout>
            <Switch>
                {isNotLogged}
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
