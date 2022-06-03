

import { Store } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    quantity: 0,
    open: false,
    total: 0,
    toPay: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity
        },
        reset: (state) => {
            state = initialState
        },
        toggle: (state) => {
            state.open = !state.open
        },
        selectItem: (state, action) => {
            const { prod, check } = action.payload
            // console.log(prod, check);
            if (check) {
                if (state.toPay?.find(p => p._id == prod?._id)) {
                    state.toPay = state.toPay.filter(p => p?._id != prod?._id)
                } else {
                    state.toPay.push(prod)
                }
            } else {
                state.toPay = state.toPay.filter(p => p?._id != prod?._id)
            }
            console.log(state.toPay);
        }
    }
})

export const { addProduct, reset, toggle, selectItem } = cartSlice.actions
export default cartSlice.reducer

