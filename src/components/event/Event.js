import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';


function Event () {
    const { eventId } = useParams()
    const states = useSelector((state) => state.events.events);
    const {title, date, description, price, rules, start, location, ageRestriction, } = states.find(event => event._id === eventId);

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='text-white'>{title}</h2>
                    <p className='text-white'>{date}</p>
                    <p className='text-white'>{description}</p>
                    <p className='text-white'>{price}</p>
                    <p className='text-white'>{rules}</p>
                    <p className='text-white'>{start}</p>
                </Col>
                <Col>
                    <form action="">
                        <div className='flex justify-center items-center'>
                            <h3>Register to {title}</h3>
                        </div>
                        <div className='flex justify-center items-center'>
                            Your name 
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Event