import './Header.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef } from 'react';

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
    const usernameRef = useRef('');
    useEffect(() => {
        const currentId = localStorage.getItem('id');

        fetchData(currentId)
            .then((data) => {
                usernameRef.current = data.name;
                console.log('Data fetched successfully:', data.name);
            })
            .catch((error) => {
                console.error('Error in fetchData:', error);
            });
    }, []);

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
                {usernameRef.current.length > 1 ? (
                    <div>
                        <h4 className='text-white'>Welcome back,</h4>
                        <h3 className='text-white'>{usernameRef.current}</h3>
                    </div>
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