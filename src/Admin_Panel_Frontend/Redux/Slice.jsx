import { createSlice } from "@reduxjs/toolkit";



export const Slice=createSlice({
    name:"app",
    initialState:{
        username:"",
        email:"",
        password:"",
        confirm_password:""
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
        }

    }
});

export const {setUsername,setEmail,setPassword,setConfirmPassword}=Slice.actions;
export default Slice.reducer;