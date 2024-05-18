import { createSlice } from '@reduxjs/toolkit';


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


export const { setTitle, setDescr, setRules, setDate, setStart, setPrice, setLocation, setAgeRestriction,
    setRegFormFirstName, setRegFormLastName, setRegFormNickname, setRegFormEmail, setRegFormPhone, setRegFormAge, setRegFormArbitrary, setRegFormArbitraryContent, 
    setOrgFirstName, setOrgLastName, setOrgEmail, setEventId, setEventFormStatus } = addEventSlice.actions;
export const addEventReducer = addEventSlice.reducer;