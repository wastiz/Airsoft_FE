import {Link} from 'react-router-dom'
import {Nav, Container, Navbar, NavDropdown} from "react-bootstrap";

function Navigation () {
    return (
        <Navbar expand="lg" className="back-secondary border-1 margin-20px">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto">
                        <Link to='/' className="text-white ml-2.5 nav-link" role={'button'} tabIndex={0}>Home</Link>
                        <Link to='/events' className="text-white ml-2.5 nav-link" role={'button'} tabIndex={0}>Events</Link>
                        <Link to='/teams' className="text-white ml-2.5 nav-link" role={'button'} tabIndex={0}>Teams</Link>
                        <NavDropdown title={<span className="text-white">Other pages</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item className='navdrop-item' href="#action/3.1">
                                <p href='#' className="text-white ml-2.5">News</p>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='navdrop-item' href="#action/3.2">
                                <p href='#' className="text-white ml-2.5">Places</p>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='navdrop-item' href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation