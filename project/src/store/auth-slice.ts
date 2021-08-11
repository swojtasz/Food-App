import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: "",
        userType: "",
        isLoggedIn: false,
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = "";
            localStorage.removeItem("token");
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setUserType(state, action) {
            state.userType = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
