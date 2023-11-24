import {configureStore} from '@reduxjs/toolkit'
import {signinReducer, loginReducer} from './slices'

const store = configureStore({
    reducer: {
        signIn: signinReducer,
        logIn: loginReducer,
    },
		middleware: getDefaultMiddleware => getDefaultMiddleware(),
		devTools: process.env.NODE_ENV !== 'production'
})

export default store;