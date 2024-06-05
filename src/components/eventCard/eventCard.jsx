import './eventCard.scss';
import placeholder from '../../img/placeholder.png';
import { Link } from 'react-router-dom'
import {Card} from "react-bootstrap";

function EventCard ({ _id, date, photos: { coverPhoto }, location, price, times: {start}, title, description }) {
    return (
    <Card style={{ width: '38.5rem' }} className={'flex flex-row'}>
        <Card.Img className={'w-60'} variant="top" src={coverPhoto? coverPhoto : placeholder} alt={'event cover'} />
        <Card.Body className={'back-secondary-dark w-40'}>
            <Card.Title><b>{title}</b></Card.Title>
            <Card.Text>
                <b>Date:</b> {date} <br/>
                <b>Location:</b> {location} <br/>
                <b>Time: </b>{start} <br/>
                <b>Price: </b>{price} <br/>
            </Card.Text>
            <Card.Text>
                {description.substring(0, 40) + "..."}
            </Card.Text>
            <Link to={`/events/${_id}`}>
                <button className='btn btn-primary'>View</button>
            </Link>
        </Card.Body>
    </Card>
    )
}

export default EventCard