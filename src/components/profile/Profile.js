import './Profile.scss';
import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setData} from '../../redux/slices/currentDataSlice'
import { setProfileData} from "../../redux/slices/editProfileSlice";
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatar from '../../img/avatar.jpg'


function Profile () {
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);
    const profileStates = useSelector((state) => state.profile);
    const [avatarSrc, setAvatarSrc] = useState('');

    const id = localStorage.getItem('id');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/id/${id}`);
                dispatch(setProfileData(response.data.profile));
                const imageData = response.data.avatar.data;
                const base64Image = Buffer.from(imageData).toString('base64');
                const src = `data:image/jpeg;base64,${base64Image}`;
                setAvatarSrc(src);
                console.log('Got profile');

            } catch (error) {
                console.error('Error getting profile from MongoDB:', error);
            }
        };

        fetchData();
    }, [id, dispatch]);
    return (
        <div className='display-row flex-centered flex-gap-5'>
            <div className='img-div'>
                <img className='avatar' src={avatarSrc} alt='avatar'></img>
            </div>
            <div>
                <h3 className='text-white text-xl'>Username:</h3>
                <h3 className='text-white text-3xl'><b>{currentStates.username}</b></h3>
                <h3>General info:</h3>
                <h3 className='text-white'><b>Email: </b>{currentStates.email}</h3>
                <h3 className='text-white'><b>First Name: </b>{profileStates.firstName}</h3>
                <h3 className='text-white'><b>Last Name: </b>{profileStates.lastName}</h3>
                <h3 className='text-white'><b>Phone: </b>{profileStates.phone}</h3>
                <h3 className='text-white'><b>About me: </b>{profileStates.aboutMe}</h3>
                <h3 className='text-white'><b>Roles: </b>{profileStates.roles[0]}</h3>
                <h3 className='text-white'><b>Team: </b>{profileStates.team}</h3>
                <h3 className='text-white'><b>Favourite weapon: </b>{profileStates.favWeapon}</h3>
            </div>
            <div>
                <Link to='/profile-edit'>
                    <button className="btn btn-outline btn-primary ml-2">Edit profile</button>
                </Link>
            </div>
        </div>
    )
}

export default Profile;