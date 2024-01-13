import './eventCard.scss';
import { Container, Row, Col } from 'react-bootstrap';
import placeholder from '../../img/placeholder.png'


function EventCard () {
    return (
        <Container className='event-card display-column justify-between'>
            <Row className='event-title'>
                <h3 className='text-white text-2xl font-semibold'>Title here</h3>
            </Row>
            <Row>
                <Col>
                    <img src={placeholder} alt="placeholder" className='w-full h-full'/>
                </Col>
                <Col>
                    <div className='flex justify-between'>
                        <p className='text-white'>Date:</p>
                        <p className='text-white'>14.01.24</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Location:</p>
                        <p className='text-white'>Narva cqb</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Starting:</p>
                        <p className='text-white'>10 AM</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Price:</p>
                        <p className='text-white'>10</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <button className='btn btn-primary event-btn'>View</button>
            </Row>
        </Container>
    )
}

export default EventCard