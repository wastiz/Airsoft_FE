import { useDispatch, useSelector} from 'react-redux';
import { setName, setEmail, setPassword, setId, setStatus, resetForm } from '../../redux/slices/signInSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SigninForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const signInStates = useSelector((state) => state.signIn);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
		case 'name':
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
				password: signInStates.password,
			})
			alert(response.data.message)
			dispatch(resetForm());
			navigate('/');
		} catch (e) {
			alert(e.response.data.message)
		}
	};

  return (
	<div className='w-full h-full items-center justify-center'>
		<form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
			<label className="label">
				<span className="label-text">What is your name?</span>
			</label>
			<input
				type="text"
				name="name"
				value={signInStates.username}
				onChange={handleChange}
				placeholder="Имя"
				className="input input-bordered w-full max-w-xs"
			/>
			<label className="label">
				<span className="label-text">What is your email?</span>
			</label>
			<input
				type="email"
				name="email"
				value={signInStates.email}
				onChange={handleChange}
				placeholder="Электронная почта"
				className="input input-bordered w-full max-w-xs"
			/>
			<label className="label">
				<span className="label-text">Create your password:</span>
			</label>
			<input
				type="password"
				name="password"
				value={signInStates.password}
				onChange={handleChange}
				placeholder="Пароль"
				className="input input-bordered w-full max-w-xs"
			/>
			<br />
			<button className="btn btn-primary" type='submit'>Submit</button>
			<p className='text-white'>{signInStates.responseText}</p>
		</form>
	</div>
  );
};

export default SigninForm;
