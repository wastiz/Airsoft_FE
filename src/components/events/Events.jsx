import './Events.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setEvents } from '../../redux/slices';
import EventCard from '../eventCard/eventCard';
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import {Col, Container, Row} from "react-bootstrap";


function Events () {
    const states = useSelector((state) => state.current)
    const events = useSelector((state) => state.events.events)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('http://localhost:5000/api/events')
          .then(response => response.json())    
          .then(data => dispatch(setEvents(data)))
          .catch(error => console.error('Error fetching events:', error));
    }, []);
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
                        <Col className={'padding-20px'}>
                            <EventCard key={event._id} {...event} className="my-2"/>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    )
}

export default Events;