import { createSlice } from '@reduxjs/toolkit';

const signInSlice = createSlice({
    name: 'sign-in',
    initialState: {
        _id: '',
        username: '',
        email: '',
        password: '',
        responseText: 'not sent',
    },
    reducers: {
        setName: (state, action) => {
            state.username = action.payload
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
            state.username = '';
            state.email = '';
            state.password = '';
        }
    },
})


export const { setName, setEmail, setPassword, setId, setStatus, resetForm } = signInSlice.actions;
export const signinReducer = signInSlice.reducer;