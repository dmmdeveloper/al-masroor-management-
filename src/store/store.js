import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import memberSlice from "./slices/membersSlice";


const store  = configureStore({
    reducer: {
        auth  : authSlice,
        members  : memberSlice
    }
})

export default store;