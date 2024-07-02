import './App.scss';
import Header from '../header/Header';
import Navigation from '../navigation/Navigation';
import Landing from '../landing/Landing';
import Teams from '../teams/Teams';
import SigninForm from '../signinForm/SigninForm';
import LoginForm from '../loginForm/LoginForm';
import Profile from '../profile/Profile';
import EditProfile from '../profile/editProfile';
import Events from '../events/Events';
import AddEvent from '../events/addEvent';
import Event from '../events/Event';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setData, setLogged} from "../../redux/slices/currentDataSlice";

function App () {

	const dispatch = useDispatch();

	const auth = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				// Если токен отсутствует в localStorage, устанавливаем logged в false и выходим
				dispatch(setLogged(false));
				return;
			}

			const response = await axios.get(`http://localhost:5000/api/users/auth`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			// Проверяем, существует ли токен и не истек ли его срок действия
			if (response.data.token) {
				// Если все в порядке, сохраняем новый токен и устанавливаем logged в true
				localStorage.setItem('token', response.data.token);
				dispatch(setLogged(true));
				dispatch(setData({
					username: response.data.user.username,
					email: response.data.user.email
				}));
			} else {
				// Если токен недействителен, удаляем его из localStorage и устанавливаем logged в false
				localStorage.removeItem('token');
				dispatch(setLogged(false));
			}
		} catch (e) {
			localStorage.removeItem('token');
			dispatch(setLogged(false));
		}
	};

	useEffect(() => {
		auth();
	}, []);

	return (
		<BrowserRouter>
			<div className='bg-base-100'>
				<Header></Header>
				<Navigation></Navigation>
				<main className="margin-20px back-secondary border-1">
					<Routes>
						<Route exact path='/' element={<Landing/>}></Route>
						<Route exact path='/teams' element={<Teams/>}></Route>
						<Route exact path='/sign-up' element={<SigninForm/>}></Route>
						<Route exact path='/log-in' element={<LoginForm/>}></Route>
						<Route exact path='/profile/*' element={<Profile/>}></Route>
						<Route exact path='/profile-edit' element={<EditProfile/>}></Route>
						<Route exact path='/events' element={<Events/>}></Route>
						<Route exact path='/add-event' element={<AddEvent/>}></Route>
						<Route exact path='/events/:eventId' element={<Event/>}></Route>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App;
