import {configureStore} from '@reduxjs/toolkit'
import signInSlice from './slices'

const store = configureStore({
    reducer: {
        signIn: signInSlice
    },
		middleware: getDefaultMiddleware => getDefaultMiddleware(),
		devTools: process.env.NODE_ENV !== 'production'
})

export default store;