import { useDispatch, useSelector} from 'react-redux';
import { setName, setEmail, setPassword, resetForm } from '../../redux/slices';

const SigninForm = () => {

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signIn);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправка данных:', formData);
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
				value={formData.name}
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
				value={formData.email}
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
				value={formData.password}
				onChange={handleChange}
				placeholder="Пароль"
				className="input input-bordered w-full max-w-xs"
			/>
			<br />
			<button className="btn btn-primary" type='submit'>Submit</button>
		</form>
	</div>
  );
};

export default SigninForm;
