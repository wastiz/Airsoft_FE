import './Events.scss';
import { useSelector } from 'react-redux';
import EventCard from './eventCard';
import {Link} from 'react-router-dom'
import { use } from 'react';
import {Col, Container, Row} from "react-bootstrap";


function Events () {
    const states = useSelector((state) => state.current)

    const events = use(fetch('http://localhost:5000/api/events').then(res => res.json()))

    return (
        <>
            {states.logged ? (
                <Link to='/add-event'><button className='text-white btn btn-primary'>Add Event</button></Link>
            ) : (
                <h3 className='text-white'>To add event you have to be logged in</h3>
            )}
            <Container>
                <Row>
                    {events.map(event => (
                        <Col key={event._id} className={'padding-20px'}>
                            <EventCard {...event} className="my-2"/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Events;