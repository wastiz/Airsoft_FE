import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNameLog, setPasswordLog, resetFormLog } from '../../redux/slices/loginSlice';
import {setLogged, setCurrentId, setData} from '../../redux/slices/currentDataSlice';
import axios from 'axios';
import {Button, Form} from "react-bootstrap";

function LoginForm () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginStates = useSelector((state) => state.logIn);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
          case 'name':
            dispatch(setNameLog(value));
            break;
          case 'password':
            dispatch(setPasswordLog(value));
            break;
          default:
            break;
        }
    };

	const handleSubmit = async (e) => {
		e.preventDefault();
		const rememberMeChecked = e.target.elements.rememberMe.checked;
		try {
			const response = await axios.post(`http://localhost:5000/api/users/login`, {
				rememberMe: rememberMeChecked,
				username: loginStates.username,
				password: loginStates.password
			});
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				dispatch(setData({
					_id: response.data.user.id,
					username: response.data.user.username,
					email: response.data.user.email,
				}));
				dispatch(setLogged(true));
				navigate('/');
				dispatch(resetFormLog());
			} else {
				alert("Token is missing in response");
			}
		} catch (e) {
			alert(e.response.data.message);
		}
	};
    
    return (
		<div className='flex flex-center padding-20px'>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address or Username</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={loginStates.username}
						onChange={handleChange}
						placeholder="Username or Email"
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else, promising)))
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						value={loginStates.password}
						onChange={handleChange}
						placeholder="Password"
						className="input input-bordered w-full max-w-xs"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check name='rememberMe' type="checkbox" label="Remember me"/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
				<p className='text-white'>{loginStates.responseText}</p>
			</Form>
		</div>
	)
}

export default LoginForm;