import './Teams.scss';
import {Button, Card, Col, Container, ListGroup, Modal, Row} from "react-bootstrap";
import {Suspense, use, useState} from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";
import logo from '../../img/logo.png'
import {useSelector} from "react-redux";
import {TeamInfo} from "./team-pages/TeamInfo";
import {TeamGallery} from "./team-pages/TeamGallery";
import {TeamMembers} from "./team-pages/TeamMembers";
import {TeamParticipations} from "./team-pages/TeamParticipations";
import axios from "axios";

function Team() {
    const { teamId } = useParams();
    const currentStates = useSelector((state) => state.current);
    const teamData = use(fetch(`http://localhost:5000/api/teams/${teamId}`).then(res => res.json()))

    const { name, author, coverPhoto, created, description, rules, joinMethod, memberLimit, members, participated } = teamData;

    const bottomContent = () => {
        if (author === currentStates._id) {
            return <p>You are author of this team</p>
        } else if (members.includes(currentStates._id)) {
            return <p>You are joined in this team</p>
        } else if (joinMethod === "Free join" ) {
            return <button onClick={() => handleShow('Joining Team', `Are you sure you want to join team "${name}"?`, 'Join Team')} className={'btn btn-primary'}>Join this team</button>
        } else if (joinMethod === "By request") {
            return <button onClick={() => handleShow('Requesting to join team', `Are you sure you sent join request to team "${name}"?`, 'Request to join')} className={'btn btn-primary'}>Request to join</button>
        } else if (joinMethod === "Restricted") {
            return <p className={'alert-danger'}>This team is restricted to join</p>
        }
    }

    //Modal
    const [show, setShow] = useState(false);
    const [modalText, setModalText] = useState([]);

    const handleClose = () => {
        setShow(false);
        setModalText([]);
    }
    const handleShow = (title, body, button) => {
        setShow(true);
        setModalText([title, body, button])
    }


    //Joining methods
    const handleJoin = async (method) => {
        if (method === 'Join Team') {
            try {
                await axios.post(`http://localhost:5000/api/teams/joining`, {
                    teamId: teamId,
                    userId: currentStates._id,
                })
                setShow(false)
                console.log(`You joined`)
            } catch (error) {
                console.error(error)
            }
        }
        if (method === "Request to join") {
            console.log('Sending request...')
        }
    }

    return (
        <Container>
            <div className="team-header" style={{backgroundImage: `url(${coverPhoto})`}}>
                <h1>{name}</h1>
                {currentStates._id === author && (
                    <Link to={`/team-form/${teamId}`}>
                        <button className="btn btn-primary">Edit Team</button>
                    </Link>
                )}
            </div>
            <br/>
            <Row>
                <Col lg={3}>
                    <Card style={{width: '16rem'}}>
                        <Card.Img className="img-thumbnail" variant="top" src={logo} />
                        <ListGroup>
                            <ListGroup.Item className="Item">
                                <Link className="link-decoration" to=''>View Info</Link>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{memberLimit > 0 ? `${members.length} / ${memberLimit} members` : `${members.length} members`}</ListGroup.Item>
                            <ListGroup.Item>
                                <Link className="link-decoration" to='team-members'>View members</Link>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Participated in {participated.length} events</ListGroup.Item>
                            <ListGroup.Item>
                                <Link className="link-decoration" to='team-participations'>View events</Link>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item className="Item">
                                <Link className="link-decoration" to='team-gallery'>Team Gallery</Link>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item className="Item">
                                {bottomContent()}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{modalText[0]}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{modalText[1]}</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => handleJoin(modalText[2])}>
                                            {modalText[2]}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={9}>
                    <Routes>
                        <Route exact path='' element={<TeamInfo teamData={[author, created, description, rules]}/>}></Route>
                        <Route exact path='team-members' element={<Suspense><TeamMembers members={members}/></Suspense>}></Route>
                        <Route exact path='team-participations' element={<TeamParticipations/>}></Route>
                        <Route exact path='team-gallery' element={<TeamGallery/>}></Route>
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
}

export default Team;