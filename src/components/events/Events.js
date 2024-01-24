import './Events.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setEvents } from '../../redux/slices';
import EventCard from '../eventCard/eventCard';
import {Link} from 'react-router-dom'
import { useEffect } from 'react';


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
                <div className='flex flex-row flex-gap flex-wrap'>
                {events.map(event => (
                    <EventCard key={event._id} {...event}/>
                ))}
                </div>
            </Row>
        </Container>
    )
}

export default Events;