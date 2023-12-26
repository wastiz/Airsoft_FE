import {configureStore} from '@reduxjs/toolkit'
import {signinReducer, loginReducer, currentDataReducer} from './slices'

const store = configureStore({
    reducer: {
        signIn: signinReducer,
        logIn: loginReducer,
        current: currentDataReducer,
    },
		middleware: getDefaultMiddleware => getDefaultMiddleware(),
		devTools: process.env.NODE_ENV !== 'production'
})

export default store;