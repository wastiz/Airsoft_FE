import './Teams.scss'
import {Link} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap";

function Teams () {
    return (
        <>
            <Link to={'/add-team'}>
                <button className={'btn btn-primary'}>Add Team</button>
            </Link>
            <Container fluid>
                <Row className={'h-10rem margin-20px mb-5'}>
                    <Col lg={10} className={'team-banner-img'}></Col>
                    <Col lg={2} className={'team-banner-info'}>
                        <h4>Team name</h4>
                        <h6>Little description about this team and what they want</h6>
                        <h6>Location: Narva</h6>
                        <button className={'btn btn-primary'}>View</button>
                    </Col>
                </Row>
                <Row className={'h-10rem margin-20px mb-5'}>
                    <Col lg={10} className={'team-banner-img'}></Col>
                    <Col lg={2} className={'team-banner-info'}>
                        <h4>Team name</h4>
                        <h6>Little description about this team and what they want</h6>
                        <h6>Location: Narva</h6>
                        <button className={'btn btn-primary'}>View</button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teams;