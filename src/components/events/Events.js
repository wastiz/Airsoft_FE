import './Events.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
function Events () {
    const states = useSelector((state) => state.current)
    return (
        <Container>
            {states.logged ? (
                <button className='text-white'>Add event</button>
            ) : (
                <div>To add event you have to be logged in</div>
            )}
            <Row>
                <Col>
                    <div className='event-block'>
                        <h1>Some text is here</h1>
                    </div>
                </Col>
                <Col>
                    <div className='event-block'>
                        <h1>Some text is here</h1>
                    </div>
                </Col>
                <Col>
                    <div className='event-block'>
                        <h1>Some text is here</h1>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Events;