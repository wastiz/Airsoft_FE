import placeholder from "../../img/placeholder.png";
import {Link} from "react-router-dom";

function UserCard({memberData: {_id, username, profile: {firstname, lastName, avatar}}}) {
    return (
        <div className="card mb-3" style={{maxWidth: "540px"}}>
            <div className="row g-0 flex flex-center">
                <div className="p-4 col-md-4">
                    <img src={avatar ? avatar : placeholder} className="img-fluid rounded-circle user-card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{username}</h5>
                        <p className="card-text">{firstname} {lastName}</p>
                        <Link to={`/profile/${_id}`}>
                            <button className={'btn btn-primary'}>Visit profile</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;