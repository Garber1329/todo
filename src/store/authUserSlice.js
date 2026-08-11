import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authTodo";

const initialState = {
    username: '',
    token: null,
    isAuth: false,
    userProfile: null,
    status: null,
    error: null
};

const authUserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout() {
            return initialState; 
        },
    },
    extraReducers: builder =>{
        builder
        .addCase(loginUser.pending, state => {
            state.status = 'loading',
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'success',
            state.error = null,
            state.isAuth = true,
            state.token = action.payload.token,
            state.userProfile  = action.payload.user,
            state.username  = action.payload.user.username
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'rejected',
            state.error = action.payload
        })
    }
});

export const { login, logout } = authUserSlice.actions;

export default authUserSlice.reducer;