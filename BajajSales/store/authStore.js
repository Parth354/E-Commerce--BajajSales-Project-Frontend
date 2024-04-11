import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: InitialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        updateUserInfo: (state, action) => {
            state.userData = {
                accessToken:state.userData.accessToken,
                refreshToken:state.userData.refreshToken,
                user:action.payload.userData
            }
        }
    }
})
const sl_initialState = {
    sl_status: false,
    sellerData: null
}

const sl_authSlice = createSlice({
    name: "sl_auth",
    initialState: sl_initialState,
    reducers: {
        sl_login: (state, action) => {
            state.sl_status = true;
            state.sellerData = action.payload.sellerData;
        },
        sl_logout: (state) => {
            state.sl_status = false;
            state.sellerData = null;
        }
    }
})
const pro_initialState = {
    productData: null
}
const product_info = createSlice({
    name: "pro_info",
    initialState: pro_initialState,
    reducers: {
        addprod_info: (state, action) => {
            state.productData = action.payload.productData;
        },
        remprod_info: (state) => {
            state.productData = null
        }
    }
})

const cartIntialState = {
    cartData: [],
    quantity: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartIntialState,
    reducers: {
        addtoCart: (state, action) => {
            const isUnique = state.cartData.every(item => item._id !== action.payload.cartData._id);
            if (isUnique) {
                state.cartData.push(action.payload.cartData);
                state.quantity[action.payload.cartData._id] = 1;
            }
        },
        remFromCart: (state, action) => {
            const productIdToRemove = action.payload._id;
            state.cartData = state.cartData.filter(item => item._id != `${productIdToRemove}`);
        },
        updateQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            state.quantity[_id] = quantity;
        }

    }
})

export const { login, logout, updateUserInfo } = authSlice.actions;
export default product_info.reducer;
export const { sl_login, sl_logout } = sl_authSlice.actions;
export { sl_authSlice, authSlice, cartSlice }
export const { addprod_info, remprod_info } = product_info.actions;
export const { addtoCart, remFromCart, updateQuantity } = cartSlice.actions;