import './Header.scss';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setLogged, setRememberMe, setCurrentId } from '../../redux/slices/currentDataSlice'
import { useNavigate } from'react-router-dom';
import logo from '../../img/logo.png'
import {Button, Container, Navbar, NavDropdown} from "react-bootstrap";

function Header () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);

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
                            <Link to={`/profile`}>
                                <Button variant="outline-primary">My Profile</Button>
                            </Link>
                            <Button onClick={logout} variant="primary">Log out</Button>
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