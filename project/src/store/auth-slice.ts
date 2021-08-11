import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: "",
        userType: "",
        isLoading: true,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setUserType(state, action) {
            state.userType = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
