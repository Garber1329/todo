import { createSlice } from "@reduxjs/toolkit";
// import { loginUser } from "./authTodo";

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
        setNewToken(state, action){
            state.token = action.payload,
            state.isAuth = true
        }
    },
    extraReducers: builder =>{
        builder
        .addCase('auth/loginUser/pending', state => {
            state.status = 'loading',
            state.error = null
        })
        .addCase('auth/loginUser/fulfilled', (state, action) => {
            state.status = 'success',
            state.error = null,
            state.isAuth = true,
            state.token = action.payload.token,
            state.userProfile  = action.payload.user,
            state.username  = action.payload.user.username
        })
        .addCase('auth/loginUser/rejected', (state, action) => {
            state.status = 'rejected',
            state.error = action.payload
        })
    }
});

export const { login, logout } = authUserSlice.actions;

export default authUserSlice.reducer;