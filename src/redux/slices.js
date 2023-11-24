import { createSlice } from '@reduxjs/toolkit';


const signInSlice = createSlice({
    name: 'sign-in',
    initialState: {
        _id: '',
        name: '',
        email: '',
        password: '',
        responseText: 'not sent',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setId: (state, action) => {
            state._id = action.payload
        },
        setStatus: (state, action) => {
            if (action.payload === 200) {
                state.responseText = 'Thank you'
            } else {
                state.responseText = 'Something went wrong'
            }
        },
        resetForm: (state) => {
            state.name = '';
            state.email = '';
            state.password = '';
        }
    },
})

const loginSlice = createSlice({
    name: 'log-in',
    initialState: {
        name: '',
        password: '',
        responseText: 'not logged',
    },
    reducers: {
        setNameLog: (state, action) => {
            state.name = action.payload
        },
        setPasswordLog: (state, action) => {
            state.password = action.payload
        },
        setStatusLog: (state, action) => {
            if (action.payload === 200) {
                state.responseText = 'Thank you, you have logged in'
            } else {
                state.responseText = 'Something went wrong'
            }
        },
        resetFormLog: (state) => {
            state.name = '';
            state.password = '';
        }
    },
})

export const { setName, setEmail, setPassword, setId, setStatus, resetForm } = signInSlice.actions;
export const signinReducer = signInSlice.reducer;

export const { setNameLog, setPasswordLog, setStatusLog, resetFormLog } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
