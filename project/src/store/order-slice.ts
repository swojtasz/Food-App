import { createSlice } from "@reduxjs/toolkit";

type Order = {
    popup: boolean;
    totalPrice: number;
    order: {
        name: string;
        price: number;
        quantity: number;
    }[];
};

const initialState: Order = {
    popup: false,
    totalPrice: 0,
    order: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        reset(state) {
            state.popup = false;
            state.totalPrice = 0;
            state.order = [];
        },
        setPopup(state, action) {
            state.popup = action.payload;
        },
        addItem(state, action) {
            const itemIndex = state.order.findIndex((item) => {
                return item.name === action.payload.name;
            });

            if (itemIndex < 0) {
                state.order.push({
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: 1,
                });
                state.totalPrice += action.payload.price;
            } else {
                state.order[itemIndex].quantity++;
                state.totalPrice += action.payload.price;
            }
        },
        removeItem(state, action) {
            const itemIndex = state.order.findIndex((item) => {
                return item.name === action.payload.name;
            });
            if (itemIndex < 0) {
                return;
            } else if (state.order[itemIndex].quantity === 1) {
                state.order.splice(itemIndex, 1);
                state.totalPrice -= action.payload.price;
            } else {
                state.order[itemIndex].quantity--;
                state.totalPrice -= action.payload.price;
            }
        },
    },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
