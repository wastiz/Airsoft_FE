import './Profile.scss';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setData} from '../../redux/slices/currentDataSlice' 
import axios from 'axios';
import avatar from '../../img/avatar.jpg'

function Profile () {
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);
    console.log(currentStates.username);

    const id = localStorage.getItem('id');
    try {
        axios.get(`http://localhost:5000/api/users/id/${id}`).then((response) =>{
            // dispatch(setProfile({
            //     name: response.data.name,
            //     email: response.data.email,
            // }));
            console.log('Got profile')
        })
    } catch (error) {
        console.error('Error getting profile from MongoDB:', error);
    }

    return (
        <div className='display-row flex-centered flex-gap-5'>
            <div className='img-div'>
                <img className='avatar' src={avatar} alt='avatar'></img>
            </div>
            <div>
                <h3 className='text-white text-xl'>Username:</h3>
                <h3 className='text-white text-3xl'><b>{currentStates.username}</b></h3>
                <h3>General info:</h3>
                <h3 className='text-white'><b>Email: </b>{currentStates.email}</h3>
                <h3 className='text-white'><b>First Name: </b></h3>
                <h3 className='text-white'><b>Last Name: </b></h3>
                <h3 className='text-white'><b>Phone: </b></h3>
                <h3 className='text-white'><b>About me: </b></h3>
                <h3 className='text-white'><b>Roles: </b></h3>
                <h3 className='text-white'><b>Team: </b></h3>
                <h3 className='text-white'><b>Favourite weapon: </b></h3>
            </div>
        </div>
    )
}

export default Profile;