import { useDispatch, useSelector} from 'react-redux';
import { setName, setEmail, setPassword, setId, setStatus, resetForm } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const SigninForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const states = useSelector((state) => state.signIn);

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
			const datas = await axios.get(`http://localhost:5000/api/users`);
			console.log(datas.data);
			let isOccupied = false;

			for (let i = 0; i < datas.data.length; i++) {
				if (datas.data[i].name === states.name) {
					console.log('Name is already registered');
					isOccupied = true;
					break;
				} else if (datas.data[i].email === states.email){
					isOccupied = true;
					console.log('Email is already registered');
					break;
				}
			}

			if (!isOccupied) {
				const newId = uuidv4();
				dispatch(setId(newId));
				localStorage.setItem("id", newId);
				const response = await axios.post('http://localhost:5000/api/users', {
					_id: newId,
					name: states.name,
					email: states.email,
					password: states.password,
				});
			
				dispatch(setStatus(response.status));
				console.log(response.statusText);
				
				dispatch(resetForm());
				navigate('/');
			} else {
				return false;
			}
		} catch (error) {
			console.error('Error submitting data to MongoDB:', error);
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
				value={states.name}
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
				value={states.email}
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
				value={states.password}
				onChange={handleChange}
				placeholder="Пароль"
				className="input input-bordered w-full max-w-xs"
			/>
			<br />
			<button className="btn btn-primary" type='submit'>Submit</button>
			<p className='text-white'>{states.responseText}</p>
		</form>
	</div>
  );
};

export default SigninForm;
