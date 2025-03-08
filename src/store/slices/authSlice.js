import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";


const initialState =  {
    isAuthenticated:  false, 
    errorMessage : false,
    authCode : "786",
    members:[]
}

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate  (state, action){
            if(action.payload === state.authCode){
                state.isAuthenticated = true;
                sessionStorage.setItem('isAuthenticated', true);
                // <Navigate to={"/"}/> 
            }else{
                state.errorMessage =true;
            }
        },
        clearError (state , action){
            state.errorMessage = false;
        }
  
    }
})

export  const  { authenticate  , clearError} = authSlice.actions;

export default authSlice.reducer;