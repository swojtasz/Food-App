import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import loadingSlice from "./loading-slice";
import orderSlice from "./order-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        loading: loadingSlice.reducer,
        order: orderSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
