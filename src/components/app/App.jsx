import './App.scss';
import 'react-image-crop/dist/ReactCrop.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {Suspense, useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setData, setLogged} from "../../redux/slices/currentDataSlice";
import {Loading} from "../assets/Loading";
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
import AddTeam from '../teams/addTeam'
import {Spinner} from "react-bootstrap";

function App () {

	const dispatch = useDispatch();

	useEffect(() => {
		async function auth () {
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
						_id: response.data.user._id,
						username: response.data.user.username,
						email: response.data.user.email,
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
		}

		auth();
	}, [dispatch]);


	return (
		<BrowserRouter>
			<Header></Header>
			<Navigation></Navigation>
			<main className="margin-20px back-secondary border-1">
				<Routes>
					<Route exact path='/' element={<Landing/>}></Route>
					<Route exact path='/sign-up' element={<SigninForm/>}></Route>
					<Route exact path='/log-in' element={<LoginForm/>}></Route>
					<Route exact path='/profile/*' element={<Suspense fallback={<Loading/>}><Profile/></Suspense>}></Route>
					<Route exact path='/profile-edit' element={<EditProfile/>}></Route>
					<Route exact path='/events' element={<Suspense fallback={<Spinner/>}><Events></Events></Suspense>}></Route>
					<Route exact path='/add-event' element={<AddEvent/>}></Route>
					<Route exact path='/events/:eventId' element={<Suspense fallback={<Spinner/>}><Event></Event></Suspense>}></Route>
					<Route exact path='/teams' element={<Suspense fallback={<Loading/>}><Teams/></Suspense>}></Route>
					<Route exact path='/add-team' element={<AddTeam/>}></Route>
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App;
