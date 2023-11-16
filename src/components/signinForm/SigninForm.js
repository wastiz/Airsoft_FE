import { useDispatch, useSelector} from 'react-redux';
import { setName, setEmail, setPassword, setStatus, resetForm } from '../../redux/slices';
import axios from 'axios';

const SigninForm = () => {

  const dispatch = useDispatch();
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

  const sendDataToMongoDB = async (data) => {
	try {
	  const response = await axios.post('http://localhost:5000/api/users', data);
	  dispatch(setStatus(response.status));
	  console.log(response.statusText);
	} catch (error) {
	  console.error(error);
	}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	sendDataToMongoDB({
		name: states.name,
		email: states.email,
		password: states.password
	});
    dispatch(resetForm());
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
