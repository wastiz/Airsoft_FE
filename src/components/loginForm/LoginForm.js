import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNameLog, setPasswordLog, setStatusLog, resetFormLog } from '../../redux/slices/loginSlice';
import { setRememberMe, setLogged, setCurrentId } from '../../redux/slices/currentDataSlice';
import axios from 'axios';

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
		try {
			const rememberMeChecked = e.target.elements.rememberMe.checked;
			axios.get(`http://localhost:5000/api/users/username/${loginStates.username}`).then(response => {
				if (response.data.username === loginStates.username || response.data.pass === loginStates.password) {
					console.log('Name and pass match')
					localStorage.setItem('id', response.data._id);
					localStorage.setItem('logged', true);
					if (rememberMeChecked) {
						localStorage.setItem('rememberMe', true);
						dispatch(setRememberMe(true));
					}
					dispatch(setCurrentId(response.data._id));
					dispatch(setLogged(true));
					navigate('/')
				}
			});
			dispatch(resetFormLog())
		} catch (error) {
			console.error('Error getting data from MongoDB:', error);
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
				value={loginStates.username}
				onChange={handleChange}
				placeholder="Имя"
				className="input input-bordered w-full max-w-xs text-white"
			/>
			<label className="label">
				<span className="label-text">And your password:</span>
			</label>
			<input
				type="password"
				name="password"
				value={loginStates.password}
				onChange={handleChange}
				placeholder="Пароль"
				className="input input-bordered w-full max-w-xs"
			/>
			<br />
			<div className="form-control">
				<label className="label cursor-pointer" htmlFor='rememberMe'>
					<span className="label-text">Remember me</span> 
					<input name='rememberMe' type="checkbox" className="checkbox checkbox-primary" />
				</label>
			</div>
			<br />
			<button className="btn btn-primary" type='submit'>Submit</button>
			<p className='text-white'>{loginStates.responseText}</p>
		</form>
	</div>
    )
}

export default LoginForm;