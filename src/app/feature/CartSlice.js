import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalAmount: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            state.cart.push(payload);
        },
        increment: (state, { payload }) => {
            const item = state.cart.find((i) => i.id === payload);
            if (item) {
                item.amount += 1;
            }
        },
        decrement: (state, { payload }) => {
            const item = state.cart.find((i) => i.id === payload);
            if (item && item.amount > 1) {
                item.amount -= 1;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        },
        deleteCart: (state, { payload }) => {
            state.cart = state.cart.filter((item) => item.id !== payload);
        },
    }
});

export const { addToCart, increment, decrement, clearCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
