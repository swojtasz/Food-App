import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import orderSlice from "./order-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        order: orderSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
