import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const MemberApi = createAsyncThunk("api", async () => {
  let response = await axios.get("http://localhost:4005/api/candidates");
  return response.data;
});

export const Slice = createSlice({
  name: "app",
  initialState: {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    isLoggedIn: false,
    loading: false,
    Members: [],
    error: null,
    role:null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirm_password = action.payload;
    },
    login: (state,action) => {
      state.isLoggedIn = true;
      state.role=action.payload.role
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    
  },
  extraReducers: (boiler) => {
    boiler
      .addCase(MemberApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(MemberApi.fulfilled, (state, action) => {
        state.loading = false;
        state.Members = action.payload;
      })
      .addCase(MemberApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },

});

export const {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  login,
  logout,
} = Slice.actions;
export default Slice.reducer;
