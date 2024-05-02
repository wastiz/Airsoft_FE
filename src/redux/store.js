import {configureStore} from '@reduxjs/toolkit'
import { eventsReducer } from './slices'
import { currentDataReducer } from './slices/currentDataSlice'
import { signinReducer } from './slices/signInSlice'
import { loginReducer } from './slices/loginSlice'
import { addEventReducer } from './slices/addEventSlice'
import { editProfileReducer} from './slices/editProfileSlice'


const store = configureStore({
    reducer: {
        signIn: signinReducer,
        logIn: loginReducer,
        current: currentDataReducer,
        addEvent: addEventReducer,
        events: eventsReducer,
        profile: editProfileReducer,
    },
		middleware: getDefaultMiddleware => getDefaultMiddleware(),
		devTools: process.env.NODE_ENV !== 'production'
})

export default store;