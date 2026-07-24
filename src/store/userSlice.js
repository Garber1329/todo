import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    token: null,
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
            state.token = 'dummy-token';
            state.isAuth = true;
        },
        logout() {
            return initialState; 
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;