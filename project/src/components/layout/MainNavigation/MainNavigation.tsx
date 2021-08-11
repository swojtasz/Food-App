import classes from "./styles.module.css";

import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { orderActions } from "../../../store/order-slice";
import { auth } from "../../../config/firebase";
import { authActions } from "../../../store/auth-slice";

const MainNavigation: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(authActions.setIsLoading(true));
        auth.signOut()
            .then(() => {
                dispatch(orderActions.reset());
                dispatch(authActions.setIsLoading(false));
                history.push("/");
            })
            .catch((error) => {
                console.log("error mainNav");
            });
    };

    if (auth.currentUser) {
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
