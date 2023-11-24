import { useDispatch, useSelector} from 'react-redux';
import { setNameLog, setPasswordLog, setStatusLog, resetFormLog } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';

function LoginForm () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const states = useSelector((state) => state.logIn);

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
				<span className="label-text">Your name, please:</span>
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
				<span className="label-text">And your password:</span>
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
    )
}

export default LoginForm;