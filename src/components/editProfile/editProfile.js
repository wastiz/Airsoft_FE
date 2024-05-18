import './editProfile.scss';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../../img/avatar.jpg'
import {useDispatch, useSelector} from "react-redux";
import {InputGroup, Form, DropdownButton, Dropdown, FloatingLabel} from "react-bootstrap";
import {setFirstName, setLastName, setAboutMe, setAge, setAvatar, setPhone, setRoles, setTeam, setFavWeapon} from "../../redux/slices/editProfileSlice";
import axios from "axios";

function EditProfile () {
    const currentStates = useSelector((state) => state.current);
    console.log(currentStates.username);

    const dispatch = useDispatch();
    const profileStates = useSelector((state) => state.editProfile);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'firstName':
                dispatch(setFirstName(value));
                break;
            case 'lastName':
                dispatch(setLastName(value));
                break;
            case 'age':
                dispatch(setAge(value));
                break;
            case 'phone':
                dispatch(setPhone(value));
                break;
            case 'aboutMe':
                dispatch(setAboutMe(value));
                break;
            case 'roles':
                dispatch(setRoles([value]));
                break;
            case 'team':
                dispatch(setTeam([value]));
                break;
            case 'favWeapon':
                dispatch(setFavWeapon());
                break;
            default:
                break;
        }
    };

    const readFile = (fileInput) => {
        return new Promise((resolve, reject) => {
            const file = fileInput.files[0];

            try {
                if (!file) {
                    reject('Файл не выбран');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(file);
            } catch (error) {
                reject(error);
            }
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('id');
        const fileInput = e.target.querySelector('input[type="file"]');

        try {
            const fileContent = await readFile(fileInput);
            console.log(fileContent)

            const profileData = {
                avatar: fileContent,
                firstName: profileStates.firstName,
                lastName: profileStates.lastName,
                age: profileStates.age,
                phone: profileStates.phone,
                aboutMe: profileStates.aboutMe,
                roles: profileStates.roles,
                team: profileStates.team,
                favWeapon: profileStates.favWeapon,
            };

            const userResponse = await axios.get(`http://localhost:5000/api/users/id/${userId}`);

            if (userResponse.data.profile === null) {
                await createProfile(userId, profileData);
            } else {
                await updateProfile(userId, profileData);
            }
            navigate('/profile')
        } catch (error) {
            console.error(error);
        }
    };


    const createProfile = async (userId, profileData) => {
        const response = await axios.post(`http://localhost:5000/api/users/${userId}/profile`, profileData);
        console.log(response.statusText);
    }

    const updateProfile = async (userId, profileData) => {
        const response = await axios.put(`http://localhost:5000/api/users/${userId}/profile`, profileData);
        console.log(response.statusText);
    }

    return (
        <div className='display-flex display-column flex-centered flex-gap-5 profile-form'>
            <form action="" onSubmit={submitForm}>
                <InputGroup className="mb-3">
                    <InputGroup.Text className='text-white'>First and Last name</InputGroup.Text>
                    <Form.Control
                        aria-label="First name"
                        placeholder='First name'
                        onChange={handleChange}
                        name='firstName'
                    />
                    <Form.Control
                        aria-label="Last name"
                        placeholder='Last name'
                        onChange={handleChange}
                        name='lastName'
                    />
                </InputGroup>
                <br/>
                <p className='text-white'>Upload your avatar:</p>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                    <input name='avatar' onChange={handleChange} type="file" className="form-control" id="inputGroupFile01"/>
                </div>
                <br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" className='text-white'>Age</InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder='Age'
                        onChange={handleChange}
                        name='age'
                    />
                </InputGroup>
                <br/>
                <InputGroup className="mb-3">
                    <DropdownButton variant="outline-secondary" title="Country" id="input-group-dropdown-1">
                        <Dropdown.Item href="#">Estonia</Dropdown.Item>
                        <Dropdown.Item href="#">Latvia</Dropdown.Item>
                        <Dropdown.Item href="#">Lithuania</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control
                        aria-label="Text input with dropdown button"
                        placeholder='Your phone number...'
                        onChange={handleChange}
                        name='phone'
                    />
                </InputGroup>
                <br/>
                <FloatingLabel controlId="floatingTextarea2" label="Leave a text about you (write anything you want)">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a text about you (write anything you want)"
                        onChange={handleChange}
                        name='aboutMe'
                        style={{height: '100px'}}
                    />
                </FloatingLabel>
                <br/>
                <InputGroup className="mb-3">
                    <DropdownButton
                        variant="outline-secondary"
                        title="Role"
                        id="input-group-dropdown-1"
                    >
                        <Dropdown.Item href="#">Write my own variant</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item href="#">Stormtrooper</Dropdown.Item>
                        <Dropdown.Item href="#">Medic</Dropdown.Item>
                        <Dropdown.Item href="#">Sniper</Dropdown.Item>
                        <Dropdown.Item href="#">Lurker</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control
                        aria-label="Text input with dropdown button"
                        placeholder='Enter you role in games...'
                        name='roles'
                    />
                </InputGroup>
                <br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" className='text-white'>
                        Team
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder='Enter existing team...'
                        onChange={handleChange}
                        name='team'
                    />
                </InputGroup>
                <br/>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default" className='text-white'>
                        Weapon
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={handleChange}
                        placeholder='Enter weapon you are playing with...'
                        name='favWeapon'
                    />
                </InputGroup>
                <button className="btn btn-primary" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default EditProfile;