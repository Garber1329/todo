import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(`https://dummyjson.com/auth/login`, {
        username,
        password,
        expiresInMins: 1,
      });

      const token = response.data.accessToken;

      const userRes = await axios.get(`https://dummyjson.com/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
        },
      });

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

      const res = await axios.get(`https://dummyjson.com/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
        },
      });

      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
