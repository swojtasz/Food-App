import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userType: "",
        isLoading: true,
    },
    reducers: {
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
