import { createSlice } from "@reduxjs/toolkit";

const durationsSlice = createSlice({
    name: "durations",
    initialState: {
        courierToRestaurantTime: 0,
        restaurantToClientTime: 0,
    },
    reducers: {
        setCourierToRestaurantTime(state, action) {
            state.courierToRestaurantTime = action.payload;
        },
        setRestaurantToClientTime(state, action) {
            state.restaurantToClientTime = action.payload;
        },
    },
});

export const durationsActions = durationsSlice.actions;
export default durationsSlice;
