import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNameLog, setPasswordLog, setStatusLog, resetFormLog } from '../../redux/slices/loginSlice';
import {setRememberMe, setLogged, setCurrentId, setData} from '../../redux/slices/currentDataSlice';
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