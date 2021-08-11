import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: "",
        userType: "",
    },
    reducers: {
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
