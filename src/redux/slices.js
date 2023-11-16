import { createSlice } from '@reduxjs/toolkit';

const signInSlice = createSlice({
    name: 'sign-in',
    initialState: {
        name: '',
        email: '',
        password: '',
        responseText: 'not sent'
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

export const { setName, setEmail, setPassword, setStatus, resetForm } = signInSlice.actions;
export default signInSlice.reducer;