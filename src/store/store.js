import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import memberSlice from "./slices/membersSlice";
import oneMemberSlice from "./slices/memberSlice.js";


const store  = configureStore({
    reducer: {
        auth  : authSlice,
        members  : memberSlice,
        member : oneMemberSlice
    }
})

export default store;