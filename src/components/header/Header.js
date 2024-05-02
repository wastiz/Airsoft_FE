import './Header.scss';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setLogged, setRememberMe, setCurrentId } from '../../redux/slices/currentDataSlice'
import { useNavigate } from'react-router-dom';
import axios from 'axios';

function Header () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);

    const id = localStorage.getItem('id');
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === "true" && id !== "") {
        try {
            axios.get(`http://localhost:5000/api/users/id/${id}`).then(response => {
                dispatch(setData({
                    username: response.data.username,
                    email: response.data.email,
                }));
                console.log('completed');
            });
        } catch (error) {
            console.error('Error getting data from MongoDB:', error);
        }
    }

    const logout = () => {
        dispatch(setData({
            username: "",
            email: "",
        }))
        localStorage.setItem("rememberMe", false);
        localStorage.setItem("logged", false);
        localStorage.setItem("id", "");
        dispatch(setLogged(false));
        dispatch(setRememberMe(false));
        dispatch(setCurrentId(""));
        navigate('/')
    }

    return (
        <header className='bg-neutral margins h-40 display-flex display-row'>
            <div>
                <h1 className='text-white'>Logo</h1>
                <h3 className='text-white'>Welcome to airsoft community</h3>
            </div>
            <div className='display-flex display-row'>
                <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn m-1">Language</label>
                    <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><p className='text-white'>English</p></li>
                        <li><p className='text-white'>Russian</p></li>
                    </ul>
                </div>
                {localStorage.getItem('logged') === 'true' ? (
                    <>
                        <div>
                            <h4 className='text-white'>Welcome back,</h4>
                            <h3 className='text-white'>{currentStates.username}</h3>
                        </div>
                        <Link to={`/profile`}>
                            <button className="btn btn-outline btn-primary ml-2">My profile</button>
                        </Link>
                        <button className="btn btn-outline btn-primary ml-2" onClick={logout}>Log out</button>
                    </>
                ) : (
                    <div>
                        <Link to='/log-in'>
                            <button className="btn btn-outline btn-primary ml-2">Log In</button>
                        </Link>
                        <Link to='/sign-up'>
                            <button className="btn btn-secondary ml-2.5">Sign Up</button>
                        </Link>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Header;