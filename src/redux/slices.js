import { createSlice } from '@reduxjs/toolkit';

const currentDataSlice = createSlice({
    name: 'currentData',
    initialState: {
        logged: false,
        _id: '',
        name: '',
        email: '',
    },
    reducers: {
        setState: (state, action) => {
            state.logged = action.payload
        },
        setData: (state, action) => {
            state._id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }
})

const signInSlice = createSlice({
    name: 'sign-in',
    initialState: {
        _id: '',
        name: '',
        email: '',
        password: '',
        responseText: 'not sent',
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
            state.name = '';
            state.email = '';
            state.password = '';
        }
    },
})

const loginSlice = createSlice({
    name: 'log-in',
    initialState: {
        name: '',
        password: '',
        rememberMe: false,
        responseText: 'not logged',
    },
    reducers: {
        setNameLog: (state, action) => {
            state.name = action.payload
        },
        setPasswordLog: (state, action) => {
            state.password = action.payload
        },
        setRememberMe: (state) => {
            state.rememberMe = !state.rememberMe
        },
        setStatusLog: (state, action) => {
            if (action.payload === 200) {
                state.responseText = 'Thank you, you have logged in'
            } else {
                state.responseText = 'Something went wrong'
            }
        },
        resetFormLog: (state) => {
            state.name = '';
            state.password = '';
        }
    },
})

const addEventSlice = createSlice({
    name: 'add-event',
    initialState: {
        _id: '',
        title: '',
        description: '',
        rules: '',
        date: '',
        start: '',
        price: '',
        location: '',
        ageRestriction: '',
        regForm: {
            firstName: false,
            lastName: false,
            nickname: false,
            email: false,
            phone: false,
            age: false,
            arbitrary: false,
            arbitraryContent: []
        },
        orgFirstName: '',
        orgLastName: '',
        orgEmail: '',
        responseText: 'not sent',
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDescr: (state, action) => {
            state.description = action.payload
        },
        setRules: (state, action) => {
            state.rules = action.payload
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setStart: (state, action) => {
            state.start = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setLocation: (state, action) => {
            state.location = action.payload
        },
        setAgeRestriction: (state, action) => {
            state.ageRestriction = action.payload
        },
        setRegFormFirstName: (state) => {
            state.regForm.firstName = true
        },
        setRegFormLastName: (state) => {
            state.regForm.lastName = true
        },
        setRegFormNickname: (state) => {
            state.regForm.nickname = true
        },
        setRegFormEmail: (state) => {
            state.regForm.email = true
        },
        setRegFormPhone: (state) => {
            state.regForm.phone = true
        },
        setRegFormAge: (state) => {
            state.regForm.age = true
        },
        setRegFormArbitrary: (state) => {
            state.regForm.arbitrary = true
        },
        setRegFormArbitraryContent: (state, action) => {
            state.regForm.arbitraryContent = action.payload
        },
        setOrgFirstName: (state, action) => {
            state.orgFirstName = action.payload
        },
        setOrgLastName: (state, action) => {
            state.orgLastName = action.payload
        },
        setOrgEmail: (state, action) => {
            state.orgEmail = action.payload
        },
        setEventId: (state, action) => {
            state._id = action.payload
        },
        setEventFormStatus: (state, action) => {
            if (action.payload === 200) {
                state.responseText = 'Thank you. Event has been added'
            } else {
                state.responseText = 'Something went wrong'
            }
        },
        resetForm: (state) => {
            state.title = '';
            state.email = '';
            state.password = '';
        }
    },
})

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload
        }
    }
})

export const { setData, setState } = currentDataSlice.actions;
export const currentDataReducer = currentDataSlice.reducer;

export const { setName, setEmail, setPassword, setId, setStatus, resetForm } = signInSlice.actions;
export const signinReducer = signInSlice.reducer;

export const { setNameLog, setPasswordLog, setStatusLog, setRememberMe, resetFormLog } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const { setTitle, setDescr, setRules, setDate, setStart, setPrice, setLocation, setAgeRestriction, setRegFormFirstName, setRegFormLastName, setRegFormNickname, setRegFormEmail, setRegFormPhone, setRegFormAge, setRegFormArbitrary, setRegFormArbitraryContent, setOrgFirstName, setOrgLastName, setOrgEmail, setEventId, setEventFormStatus } = addEventSlice.actions;
export const addEventReducer = addEventSlice.reducer;

export const { setEvents } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;