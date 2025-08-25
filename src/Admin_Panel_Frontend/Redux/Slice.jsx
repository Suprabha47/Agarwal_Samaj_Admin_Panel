import { createSlice } from "@reduxjs/toolkit";

export const Slice=createSlice({
    name:"app",
    initialState:{
        username:"",
        email:"",
        password:"",
        confirm_password:"",
        isLoggedIn:false
    },
    reducers:{
        setUsername:(state,action)=>{
            state.username=action.payload;
        },
        setEmail:(state,action)=>{
            state.email=action.payload;
        },
        setPassword:(state,action)=>{
            state.password=action.payload;
        },
        setConfirmPassword:(state,action)=>{
            state.confirm_password=action.payload;
        },
        login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("auth", JSON.stringify(state));
    },

    }
});

export const {setUsername,setEmail,setPassword,setConfirmPassword,login,logout}=Slice.actions;
export default Slice.reducer;