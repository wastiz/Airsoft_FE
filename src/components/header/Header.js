import './Header.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

function Header () {
    const [userData, setUserData] = useState();

    useEffect(() => {
        const currentId = localStorage.getItem('id');

        fetchData(currentId)
            .then((data) => {
                console.log('Data fetched successfully:', data);
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error in fetchData:', error);
            });
    }, []); // Empty dependency array to run only once when the component mounts

    useEffect(() => {
        console.log('Current userData:', userData);
    }, [userData]); // Log the state whenever it changes

    return (
        <header className='bg-neutral margins h-40 display-row'>
            <div>
                <h1 className='text-white'>Logo</h1>
                <h3 className='text-white'>Welcome to airsoft community</h3>
            </div>
            <div className='display-row'>
                <div class="dropdown dropdown-end">
                    <label tabIndex="0" class="btn m-1">Language</label>
                    <ul tabIndex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><p className='text-white'>English</p></li>
                        <li><p className='text-white'>Russian</p></li>
                    </ul>
                </div>
                {userData.length > 2 ? (
                    userData
                ) : (
                    <div>
                        <button className="btn btn-outline btn-primary ml-2">Log In</button>
                        <button className="btn btn-secondary ml-2.5">
                            <Link to='/sign-up'>Sign Up</Link>
                        </button>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Header;