import classes from "./styles.module.scss";

import MainNavigation from "../MainNavigation/MainNavigation";

const Layout: React.FC = (props) => {
    return (
        <>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </>
    );
};

export default Layout;
