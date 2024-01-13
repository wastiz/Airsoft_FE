import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Event () {
    const { eventId } = useParams()
    const states = useSelector((state) => state.events.events);
    const {title, date, description, price, rules, start} = states.find(event => event._id === eventId);

    return (
        <>
            <h2 className='text-white'>{title}</h2>
            <p className='text-white'>{date}</p>
            <p className='text-white'>{description}</p>
            <p className='text-white'>{price}</p>
            <p className='text-white'>{rules}</p>
            <p className='text-white'>{start}</p>
        </>
    )
}

export default Event