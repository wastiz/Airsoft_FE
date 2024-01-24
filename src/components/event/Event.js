import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import './Event.scss';
import axios from 'axios';

const fetchData = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  function Event() {
    const { eventId } = useParams();
    const [event, setEvent] = useState();
  
    useEffect(() => {
      const fetchDataAndSetEvent = async () => {
        try {
          const data = await fetchData(eventId);
          setEvent(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchDataAndSetEvent();
    }, [eventId]);

    if (!event) {
      return <div>Loading...</div>;
    }
  
    console.log(event);
    const {title, date, description, rules, price, start, location, ageRestriction, regForm, orgFirstName, orgLastName, orgEmail} = event
    const {firstName, lastName, nickname, email, phone, age, arbitrary, arbitraryContent} = regForm
    return (
        <Container>
            <Row>
                <Col>
                    <div className='eventDesc'>
                        <h2 className='text-white'>{title}</h2>
                        <p className='text-white'>{date}</p>
                        <p className='text-white'>{description}</p>
                        <p className='text-white'>{price}</p>
                        <p className='text-white'>{rules}</p>
                        <p className='text-white'>{start}</p>
                        <p className='text-white'>{location}</p>
                        <p className='text-white'>{orgFirstName}</p>
                        <p className='text-white'>{orgLastName}</p>
                        <p className='text-white'>{orgEmail}</p>
                    </div>
                </Col>
                <Col>
                    <form className='eventRegForm' action="">
                        <div className='flex flex-col justify-center items-center'>
                            <h3>Register to {title}</h3>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            {firstName ? 
                            <>
                            <label className='text-white'>Enter your name:</label>
                            <input type="text" placeholder='Type here...'/>
                            </>
                            : null}

                            {lastName ? 
                            <>
                            <label className='text-white'>Enter your surname:</label>
                            <input type="text" placeholder='Type here...'/>
                            </>
                            : null}

                            {nickname ? 
                            <>
                            <label className='text-white'>Enter your nickname:</label>
                            <input type="text" placeholder='Type here...'/>
                            </>
                            : null}

                            {email ? 
                            <>
                            <label className='text-white'>Enter your email:</label>
                            <input type="text" placeholder='Type here...'/>
                            </>
                            : null}

                            {phone ? 
                            <>
                            <label className='text-white'>Enter your phone:</label>
                            <input type="text" placeholder='Type here...'/>
                            </>
                            : null}
                            
                            {age ? 
                            <>
                            <label className='text-white'>Enter your age:</label>
                            <input type="text" placeholder='Type here...'/>
                            </>
                            : null}

                            {arbitrary ? 
                            <>
                            {arbitraryContent[0] === 'select'? 
                            <>
                            <label className='text-white' htmlFor='selection'>{arbitraryContent[1]}</label>
                            <select className="select w-full max-w-xs" name='selection'>
                                <option disabled selected>Choose one of the option</option>
                                {arbitraryContent[2].map(item => <option>{item}</option>)}
                            </select>
                            </> 
                            : null}
                            {arbitraryContent[0] === 'textarea'? <><label className='text-white' htmlFor='textarea'>{arbitraryContent[1]}</label><textarea name="textarea" id="" cols="30" rows="10"></textarea></> : null}
                            </>
                            : null}
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Event