import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await api.post(`/auth/login`, {
        username,
        password,
        expiresInMins: 1,
      });

      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      
      if(token){
        thunkAPI.dispatch({type: "auth/setNewToken", payload: token})
      }

      if (refreshToken){
        localStorage.setItem("refreshToken", refreshToken);
      }

      const userRes = await api.get(`/user/me`);

      return {
        token,
        user: userRes.data
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {

      const token = thunkAPI.getState().auth.token

      if(!token) return thunkAPI.rejectWithValue('Token undefind')

      const res = await api.get(`/auth/me`);

      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
