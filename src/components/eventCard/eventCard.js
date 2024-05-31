import './eventCard.scss';
import placeholder from '../../img/placeholder.png';
import { Link } from 'react-router-dom'

function EventCard ({ _id, date, photos: { coverPhoto }, location, price, times: {start}, title, description }) {
    return (
        <div className="card grid grid-cols-2 w-10/12 h-80 bg-base-100 shadow-xl">
            <div className='col-span-2 bg-primary text-white text-center'>
                {title}
            </div>
            <figure className="w-full h-full overflow-hidden">
                <img src={coverPhoto? coverPhoto : placeholder} alt="event cover" className="rounded-xl w-full bg-contain"/>
            </figure>
            <div className="card-body">
                <h2 className="text-white">Date: {date}</h2>
                <h2 className="text-white">Start time: {start}</h2>
                <h2 className="text-white">Location: {location}</h2>
                <h2 className="text-white">Ticket: {price}</h2>
                <p className='text-white'>{description.substring(0, 40) + "..."}</p>
                <div className="card-actions">
                    <Link to={`/events/${_id}`}>
                        <button className='btn btn-primary event-btn'>View</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventCard