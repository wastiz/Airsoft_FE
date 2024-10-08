import { createSlice } from '@reduxjs/toolkit';


const currentDataSlice = createSlice({
    name: 'currentData',
    initialState: {
        _id: '',
        username: '',
        email: '',
        logged: false,
        rememberMe: false,
        notifications: [],
    },
    reducers: {
        setData: (state, action) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        setLogged: (state, action) => {
            state.logged = action.payload
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload
        }
    }
})

export const { setData, setLogged, setRememberMe, setNotifications} = currentDataSlice.actions;
export const currentDataReducer = currentDataSlice.reducer;
