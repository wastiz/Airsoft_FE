import './Profile.scss';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setData} from '../../redux/slices' 
import axios from 'axios';

const fetchData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

function Profile () {
    const dispatch = useDispatch();
    const states = useSelector((state) => state.current);

    const { userId } = useParams();
    useEffect(() => {
        fetchData(userId).then(data => {
            dispatch(setData(data))
        })
    }, [userId]);


    return (
        <div className='display-row'>
            <div className='img-div'></div>
            <div>
                <h1 className='text-white'>Some info about user:</h1>
                <h3 className='text-white'><b>Username: </b>{states.name}</h3>
                <h3 className='text-white'><b>Email: </b>{states.email}</h3>
            </div>
        </div>
    )
}

export default Profile;