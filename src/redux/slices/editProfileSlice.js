import { createSlice } from '@reduxjs/toolkit';


const editProfileSlice = createSlice({
    name: 'edit-profile',
    initialState: {
        firstName: '',
        lastName: '',
        avatar: '',
        age: null,
        phone: '',
        aboutMe: '',
        roles: [],
        team: [],
        favWeapon: '',
    },
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setAge: (state, action) => {
            state.age = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setAboutMe: (state, action) => {
            state.aboutMe = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setTeam: (state, action) => {
            state.team = action.payload;
        },
        setFavWeapon: (state, action) => {
            state.favWeapon = action.payload;
        },
        setProfileData: (state, action) => {
            state.avatar = action.payload.avatar;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.age = action.payload.age;
            state.phone = action.payload.phone;
            state.aboutMe = action.payload.aboutMe;
            state.team = action.payload.team;
            state.roles = action.payload.roles;
            state.favWeapon = action.payload.favWeapon;
        },
        setEventFormStatus: (state, action) => {
            if (action.payload === 200) {
                state.responseText = 'Thank you. Event has been added';
            } else {
                state.responseText = 'Something went wrong';
            }
        },
        resetForm: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.avatar = null;
            state.age = '';
            state.phone = '';
            state.aboutMe = '';
            state.roles = [];
            state.team = [];
            state.favWeapon = '';
        }
    },
})


export const { setFirstName, setLastName, setAvatar, setAge, setPhone, setAboutMe, setRoles, setTeam, setFavWeapon, setProfileData } = editProfileSlice.actions;
export const editProfileReducer = editProfileSlice.reducer;