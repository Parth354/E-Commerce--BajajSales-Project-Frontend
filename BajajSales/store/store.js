import { configureStore } from '@reduxjs/toolkit';
import product_info, { sl_authSlice ,authSlice , cartSlice } from './authStore'
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sl_auth: sl_authSlice.reducer,
        pro_info:product_info,
        cart:cartSlice.reducer
    },
});

export default store;