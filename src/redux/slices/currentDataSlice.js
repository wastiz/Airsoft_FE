import { createSlice } from '@reduxjs/toolkit';


const currentDataSlice = createSlice({
    name: 'currentData',
    initialState: {
        _id: '',
        username: '',
        email: '',
        logged: false,
        rememberMe: false,
    },
    reducers: {
        setData: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        setLogged: (state, action) => {
            state.logged = action.payload
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload
        },
        setCurrentId: (state, action) => {
            state._id = action.payload
        }
    }
})

export const { setData, setLogged, setRememberMe, setCurrentId } = currentDataSlice.actions;
export const currentDataReducer = currentDataSlice.reducer;
