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
	const newId = uuidv4();
	dispatch(setId(newId));
	localStorage.setItem('id', newId);
	e.preventDefault();
  
	try {
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
			{states.responseText}
		</form>
	</div>
  );
};

export default SigninForm;
