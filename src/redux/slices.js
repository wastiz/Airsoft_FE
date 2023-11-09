import { createSlice } from '@reduxjs/toolkit';

const signInSlice = createSlice({
    name: 'sign-in',
    initialState: {
        name: '',
        email: '',
        password: '',
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
        resetForm: (state) => {
            state.name = '';
            state.email = '';
            state.password = '';
        }
    },
})

export const { setName, setEmail, setPassword, resetForm } = signInSlice.actions;
export default signInSlice.reducer;