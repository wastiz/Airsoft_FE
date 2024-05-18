import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'log-in',
    initialState: {
        username: '',
        password: '',
        responseText: 'not logged',
    },
    reducers: {
        setNameLog: (state, action) => {
            state.username = action.payload
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
            state.username = '';
            state.password = '';
        }
    },
})


export const { setNameLog, setPasswordLog, setStatusLog, resetFormLog } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;