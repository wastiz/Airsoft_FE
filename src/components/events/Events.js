import './Events.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EventCard from '../eventCard/eventCard';
import {Link} from 'react-router-dom'


function Events () {
    const states = useSelector((state) => state.current)
    return (
        <Container>
            <Row>
                {states.logged ? (
                    <Link to='/add-event'><button className='text-white btn btn-primary'>Add Event</button></Link>
                ) : (
                    <h3 className='text-white'>To add event you have to be logged in</h3>
                )}
            </Row>
            <br />
            <Row>
                <Col>
                    <EventCard/>
                </Col>
                <Col>
                    <EventCard/>
                </Col>
                <Col>
                    <EventCard/>
                </Col>
            </Row>
        </Container>
    )
}

export default Events;