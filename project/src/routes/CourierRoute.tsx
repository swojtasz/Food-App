import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { auth } from "../config/firebase";
import { RootState } from "../store";

const CourierRoute: React.FC<{ userType: string }> = (props) => {
    const userType = useSelector((state: RootState) => state.auth.userType);

    if (!auth.currentUser && userType === "courier") {
        return <Redirect to="/login" />;
    }

    return <>{props.children}</>;
};

export default CourierRoute;
