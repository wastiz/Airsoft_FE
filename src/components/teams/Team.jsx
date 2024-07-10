import './Teams.scss';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {Suspense, use} from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";
import logo from '../../img/logo.png'
import {useSelector} from "react-redux";
import {TeamInfo} from "./team-pages/TeamInfo";
import {TeamGallery} from "./team-pages/TeamGallery";
import {TeamMembers} from "./team-pages/TeamMembers";
import {TeamParticipations} from "./team-pages/TeamParticipations";

function Team() {
    const { teamId } = useParams();
    const currentStates = useSelector((state) => state.current);
    const teamData = use(fetch(`http://localhost:5000/api/teams/${teamId}`).then(res => res.json()))

    const { name, author, coverPhoto, created, description, rules, memberLimit, members, participated } = teamData;

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
                    </Card>
                </Col>
                <Col lg={9}>
                    <Routes>
                        <Route exact path='' element={<TeamInfo teamData={teamData}/>}></Route>
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