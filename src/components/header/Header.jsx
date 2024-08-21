import './Header.scss';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setLogged, setRememberMe } from '../../redux/slices/currentDataSlice'
import { useNavigate } from'react-router-dom';
import logo from '../../img/logo.png'
import {Badge, Button, Container, Navbar, NavDropdown, OverlayTrigger, Popover} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";


function Header () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/user-notifications`, {
                    params: { userId: currentStates._id },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [currentStates._id]);

    console.log(notifications);

    const popover = (
        <Popover id="popover-basic">
            {/*<Popover.Header style={{ backgroundColor: 'green' }} as="h3">Notifications</Popover.Header>*/}
            <Popover.Body>
                {currentStates.length > 0 ? currentStates.notifications.map(item => {
                    <>
                        <p>{item.title}</p>
                        <p>{item.message}</p>
                    </>
                }) : <p>You have no notifications</p>}
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
                                <Button variant="primary">
                                    Notifications <Badge bg="warning">9</Badge>
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