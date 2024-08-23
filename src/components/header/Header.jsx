import './Header.scss';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setData, setLogged, setRememberMe} from '../../redux/slices/currentDataSlice'
import { useNavigate } from'react-router-dom';
import logo from '../../img/logo.png'
import {Badge, Button, Container, Navbar, NavDropdown, OverlayTrigger, Popover} from "react-bootstrap";
import axios from "axios";


function Header ({notifications}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);

    const unread = notifications.filter(item => !item.read);
    const read = notifications.filter(item => item.read);

    function notificationMaker(array) {
        return array.map(item => {
            switch (item.type) {
                case 'app':
                    return (
                        <div className={'notification-container mb-3'} key={item._id}>
                            <h5>{item.title}</h5>
                            <hr/>
                            <p>{item.message}</p>
                        </div>
                    );
                case 'team_join_request':
                    return (
                        <div className={'notification-container mb-3'} key={item._id}>
                            <h5>{item.title}</h5>
                            <hr/>
                            <p>{item.message}</p>
                            <div className={'flex flex-row'}>
                                <button className={'btn btn-primary'}>Accept</button>
                                <button className={'btn btn-danger'}>Decline</button>
                            </div>
                        </div>
                    );
                case 'team_joined':
                    return (
                        <div className={'notification-container mb-3'} key={item._id}>
                            <h5>{item.title}</h5>
                            <hr/>
                            <p>{item.message}</p>
                        </div>
                    );
                case 'message':
                    return (
                        <div className={'notification-container mb-3'} key={item._id}>
                            <h5>{item.title}</h5>
                            <hr/>
                            <p>{item.message}</p>
                            <Link to={'/'}>
                                <button className={'btn btn-primary'}>Go to chat</button>
                            </Link>
                        </div>
                    );
                case 'event_registered':
                    return (
                        <div className={'notification-container mb-3'} key={item._id}>
                            <h5>{item.title}</h5>
                            <hr/>
                            <p>{item.message}</p>
                            <button className={'btn btn-primary'}>View table</button>
                        </div>
                    );
                default:
                    return null;
            }
        });
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                {notifications.length > 0 ? (
                    <>
                        {unread.length > 0 && (
                            <>
                                <b>Unread:</b>
                                {notificationMaker(unread)}
                            </>
                        )}

                        {read.length > 0 && (
                            <>
                                <b>Recently read:</b>
                                {notificationMaker(read)}
                            </>
                        )}
                    </>
                ) : (
                    <p>You have no notifications</p>
                )}
            </Popover.Body>
        </Popover>
    );


    const logout = () => {
        dispatch(setData({
            _id: "",
            username: "",
            email: "",
        }))
        localStorage.setItem('token', '')
        dispatch(setLogged(false));
        dispatch(setRememberMe(false));
        navigate('/')
    }

    const handleNotCheck = () => {
        let newArray = []
        notifications.forEach(item => {
            newArray.push(item._id)
        })
        axios.post("http://localhost:5000/api/users/notificationCheck", {
            notificationsIds: newArray,
            userId: currentStates._id,
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
    }

    return (
        <Navbar expand="lg" className="back-secondary border-1 margin-20px justify-content-between">
            <Container>
                <Link to='/'>
                    <Navbar.Brand className='flex flex-row flex-gap-5'>
                            <img
                                alt="logo"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            <b>Airsoft FE</b>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                <Navbar.Collapse id="header" className="justify-content-end flex-gap-1">

                    {currentStates.logged ? (
                        <>
                            <Navbar.Text className="text-white">
                                Signed in as: <br/> <b>{currentStates.username}</b>
                            </Navbar.Text>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                <Button onClick={handleNotCheck} variant="primary">
                                    Notifications <Badge bg="warning">{notifications.length}</Badge>
                                    <span className="visually-hidden">unread messages</span>
                                </Button>
                            </OverlayTrigger>
                            <Link to={`/profile/${currentStates._id}`}>
                                <Button variant="primary">My Profile</Button>
                            </Link>
                            <Button onClick={logout} variant="outline-primary">Log out</Button>
                        </>
                    ) : (
                        <>
                            <Link to='/log-in'>
                                <Button variant="primary">Log in</Button>
                            </Link>
                            <Link to='/sign-up'>
                                <Button variant="primary">Sign up</Button>
                            </Link>
                        </>
                    )}

                    <NavDropdown title="Language" id="basic-nav-dropdown">
                        <NavDropdown.Item className='navdrop-item' href="#action/3.1">Estonian</NavDropdown.Item>
                        <NavDropdown.Item className='navdrop-item' href="#action/3.2">Latvian</NavDropdown.Item>
                        <NavDropdown.Item className='navdrop-item' href="#action/3.3">English</NavDropdown.Item>
                        <NavDropdown.Item className='navdrop-item' href="#action/3.4">Russian</NavDropdown.Item>
                    </NavDropdown>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default Header;