import './Navigation.scss'
import {Link} from 'react-router-dom'
import {Nav, Container, Navbar, NavDropdown, InputGroup, Dropdown, DropdownButton, Form} from "react-bootstrap";

function Navigation () {
    return (
        <Navbar expand="lg" className="back-secondary border-1 margin-20px">
            <Container>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Link to='/' className="text-white ml-2.5 nav-link" role={'button'} tabIndex={0}>Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/events' className="text-white ml-2.5 nav-link" role={'button'} tabIndex={0}>Events</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/teams' className="text-white ml-2.5 nav-link" role={'button'} tabIndex={0}>Teams</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title={<span className="text-white">Other pages</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item className='navdrop-item' href="#action/3.1">
                                <p className="text-white ml-2.5">News</p>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='navdrop-item' href="#action/3.2">
                                <p className="text-white ml-2.5">Places</p>
                            </NavDropdown.Item>
                            <NavDropdown.Item className='navdrop-item' href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                </Nav>
                <Nav className="ms-auto">
                    <InputGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title="Search by"
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item href="#">Action</Dropdown.Item>
                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control placeholder={'Search...'} className={'main-search-input'} aria-label="Text input with dropdown button" />
                    </InputGroup>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation