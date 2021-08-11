import classes from "./styles.module.css";

import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { authActions } from "../../../store/auth-slice";
import { auth } from "../../../config/firebase";

const MainNavigation: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );
    const dispatch = useDispatch();
    const history = useHistory();

    if (isLoggedIn) {
        const logoutHandler = () => {
            auth.signOut()
                .then(() => {
                    dispatch(authActions.logout());
                    dispatch(orderActions.reset());
                    history.push("/");
                })
                .catch((error) => {
                    console.log("error mainNav");
                });
        };

        return (
            <nav className={classes.nav}>
                <NavLink to="/" activeClassName={classes.active} exact>
                    Strona Główna
                </NavLink>
                {!isLoading && (
                    <div className={classes.navRight}>
                        <NavLink to="/" onClick={logoutHandler}>
                            Wyloguj
                        </NavLink>
                    </div>
                )}
            </nav>
        );
    } else {
        return (
            <nav className={classes.nav}>
                <NavLink to="/" activeClassName={classes.active} exact>
                    Strona Główna
                </NavLink>
                {!isLoading && (
                    <div className={classes.navRight}>
                        <NavLink to="/login" activeClassName={classes.active}>
                            Logowanie
                        </NavLink>
                        <NavLink
                            to="/register"
                            activeClassName={classes.active}
                        >
                            Rejestracja
                        </NavLink>
                    </div>
                )}
            </nav>
        );
    }
};

export default MainNavigation;
