import './Teams.scss';
import {Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {use} from "react";
import {Link, useParams} from "react-router-dom";
import logo from '../../img/logo.png'
import {useSelector} from "react-redux";

function Team () {
    const {teamId} = useParams();
    const currentStates = useSelector((state) => state.current)
    const teamData = use(fetch(`http://localhost:5000/api/teams/${teamId}`).then(res => res.json()))
    const {name, author, coverPhoto, created, description, rules, memberLimit, members, otherPhotos, participated} = teamData

    console.log(author)
    console.log(currentStates._id)
    return (
        <Container>
            <div className="team-header" style={{backgroundImage: `url(${coverPhoto})`}}>
                <h1>{name}</h1>
                {currentStates._id === author && (
                    <Link to={'/add-team'}>
                        <button className={'btn btn-primary'}>Edit Team</button>
                    </Link>
                )}
            </div>
            <br/>
            <Row>
                <Col lg={3}>
                    <Card style={{width: '16rem'}}>
                        <Card.Img className={'img-thumbnail'} variant="top" src={logo}/>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{memberLimit > 0 ? members.length +  ' / ' + memberLimit + ' members' : members.length + ' members'}</ListGroup.Item>
                            <ListGroup.Item>
                                <Link className={'link-decoration'} to={'/'}>View members</Link>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Participated in {participated.length} events</ListGroup.Item>
                            <ListGroup.Item>
                                <Link className={'link-decoration'} to={'/'}>View events</Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={9}>
                    <h3>About the team</h3>
                    <p>created by <b>{author}</b> at <b>{created}</b></p>
                    <p>{description}</p>
                    <p>{rules}</p>
                    <Link className={'link-decoration'} to={'/'}>Team Gallery</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Team;