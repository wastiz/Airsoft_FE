import { useDispatch, useSelector} from 'react-redux';
import { setNameLog, setPasswordLog, setRememberMe, setStatusLog, resetFormLog } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
		  case 'rememberMe':
			dispatch(setRememberMe());
			console.log(states.rememberMe);
			break;
          default:
            break;
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${states.name}`);
      
        if (response.data.name === states.name || response.data.pass === states.password) {
			console.log('good')
			if (states.rememberMe) {
				localSt
			}
			dispatch(resetFormLog())
			navigate('/')
        }
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
			<div className="form-control">
				<label className="label cursor-pointer" htmlFor='rememberMe'>
					<span className="label-text">Remember me</span> 
					<input name='rememberMe' type="checkbox" onChange={handleChange} className="checkbox checkbox-primary" />
				</label>
			</div>
			<br />
			<button className="btn btn-primary" type='submit'>Submit</button>
			<p className='text-white'>{states.responseText}</p>
		</form>
	</div>
    )
}

export default LoginForm;