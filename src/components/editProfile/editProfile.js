import './editProfile.scss';
import { Link } from 'react-router-dom';
import avatar from '../../img/avatar.jpg'
import {useSelector} from "react-redux";
import {useCallback} from "react";

function EditProfile () {
    const currentStates = useSelector((state) => state.current);
    console.log(currentStates.username);

    const submitForm = () => {

    }
    return (
        <div className='flex-centered'>
            <form action="" onSubmit={submitForm}>

            </form>
        </div>
    )
}

export default EditProfile;