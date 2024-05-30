import './eventCard.scss';
import placeholder from '../../img/placeholder.png';
import { Link } from 'react-router-dom'

function EventCard ({ _id, date, location, price, start, title }) {
    return (
        <div className="card grid grid-cols-2 w-10/12 h-80 bg-base-100 shadow-xl">
            <div className='col-span-2 bg-primary h-1/2 text-white text-center'>
                {title}
            </div>
            <figure className="m-w-full h-full">
                <img src={placeholder} alt="event cover" className="rounded-xl"/>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Date: {date}</h2>
                <h2 className="card-title">Location: {location}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
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