import './eventCard.scss';
import { Container, Row, Col } from 'react-bootstrap';
import placeholder from '../../img/placeholder.png';
import { Link } from 'react-router-dom'

function EventCard ({ _id, date, price, start, title }) {
    return (
        <Container className='event-card display-column justify-between'>
            <Row className='event-title'>
                <h3 className='text-white text-2xl font-semibold'>{title}</h3>
            </Row>
            <Row>
                <Col>
                    <img src={placeholder} alt="placeholder" className='w-full h-full'/>
                </Col>
                <Col>
                    <div className='flex justify-between'>
                        <p className='text-white'>Date:</p>
                        <p className='text-white'>{date}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Location:</p>
                        <p className='text-white'>Narva CQB</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Starting:</p>
                        <p className='text-white'>{start}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Price:</p>
                        <p className='text-white'>{price}</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Link to={`/events/${_id}`}><button className='btn btn-primary event-btn'>View</button></Link>
            </Row>
        </Container>
    )
}

export default EventCard