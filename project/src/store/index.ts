import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import durationsSlice from "./durations-slice";
import orderSlice from "./order-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        order: orderSlice.reducer,
        durations: durationsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
