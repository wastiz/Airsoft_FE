import { useDispatch, useSelector} from 'react-redux';
import { setName, setEmail, setPassword, setId, setStatus, resetForm } from '../../redux/slices/signInSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button, Form} from "react-bootstrap";
import {addNotification} from "../assets/Functions";
import {v4 as uuidv4} from "uuid";

const SigninForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const signInStates = useSelector((state) => state.signIn);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
		case 'username':
			dispatch(setName(value));
			break;
		case 'email':
			dispatch(setEmail(value));
			break;
		case 'password':
			dispatch(setPassword(value));
			break;
		default:
			break;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/users/registration', {
				username: signInStates.username,
				email: signInStates.email,
				password: signInStates.password
			})
			alert(response.data.message)
			dispatch(resetForm());
			navigate('/');
		} catch (e) {
			alert(e.response.data.message)
		}
	};

  return (
	<div className='flex flex-center padding-20px'>
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Enter your Username</Form.Label>
				<Form.Control
					type="text"
					name="username"
					value={signInStates.username}
					onChange={handleChange}
					placeholder="Username"
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="email">
				<Form.Label>Enter your Email</Form.Label>
				<Form.Control
					type="text"
					name="email"
					value={signInStates.email}
					onChange={handleChange}
					placeholder="Email"
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label>Create Password</Form.Label>
				<Form.Control
					type="password"
					name="password"
					value={signInStates.password}
					onChange={handleChange}
					placeholder="Password"
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
			<p>{signInStates.responseText}</p>
		</Form>
	</div>
)
	;
};

export default SigninForm;
