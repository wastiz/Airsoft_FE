import {configureStore} from '@reduxjs/toolkit'
import {signinReducer, loginReducer, currentDataReducer, addEventReducer, eventsReducer} from './slices'

const store = configureStore({
    reducer: {
        signIn: signinReducer,
        logIn: loginReducer,
        current: currentDataReducer,
        addEvent: addEventReducer,
        events: eventsReducer,
    },
		middleware: getDefaultMiddleware => getDefaultMiddleware(),
		devTools: process.env.NODE_ENV !== 'production'
})

export default store;