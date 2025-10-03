import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createSafeError } from "../../utils/errorUtils";

export const MemberApi = createAsyncThunk("members/fetchAll", async () => {
  let response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/candidates`
  );
  return response.data;
});

export const MembershipApi = createAsyncThunk(
  "memberships/fetchAll",
  async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/membership`
    );
    return response.data;
  }
);

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
    role: null,
    classified: [],
    id: null,
    name: "",
    SliderImages: [],
    Attributes: [],
    Atbutes: [],
    Category: [],
    Articles: [],
    Memberships: [],
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
    login: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.password = "";
      state.id = action.payload.id;
      state.name = action.payload.name;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setClassified: (state, action) => {
      state.classified = action.payload;
    },
    setSliderImages: (state, action) => {
      state.SliderImages = action.payload;
    },
    setAttributes: (state, action) => {
      state.Attributes = action.payload;
    },
    setAtbutes: (state, action) => {
      state.Atbutes = action.payload;
    },
    setCategory: (state, action) => {
      state.Category = action.payload;
    },
    setArticle: (state, action) => {
      state.Articles = action.payload;
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
        state.error = createSafeError(action.error);
      })
      .addCase(MembershipApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(MembershipApi.fulfilled, (state, action) => {
        state.loading = false;
        state.Memberships = action.payload;
      })
      .addCase(MembershipApi.rejected, (state, action) => {
        state.loading = false;
        state.error = createSafeError(action.error);
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
  setClassified,
  setSliderImages,
  setAttributes,
  setAtbutes,
  setCategory,
  setArticle,
} = Slice.actions;
export default Slice.reducer;
