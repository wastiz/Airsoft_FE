import './App.scss';
import 'react-image-crop/dist/ReactCrop.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {Suspense, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setData, setLogged, setNotifications} from "../../redux/slices/currentDataSlice";
import {Loading} from "../assets/Loading";
import Header from '../header/Header';
import Navigation from '../navigation/Navigation';
import Landing from '../landing/Landing';
import SigninForm from '../signinForm/SigninForm';
import LoginForm from '../loginForm/LoginForm';
import Profile from '../profile/Profile';
import EditProfile from '../profile/editProfile';
import Events from '../events/Events';
import Event from '../events/Event';
import AddEvent from '../events/addEvent';
import Teams from '../teams/Teams';
import Team from "../teams/Team";
import TeamForm from '../teams/TeamForm'
import {Spinner} from "react-bootstrap";

function App () {

	const dispatch = useDispatch();
	const [notifications, setNotifications] = useState([]);


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
					// Если все в порядке, сохраняем новый токен и устанавливаем дату и получаем уведомления
					const { token, _id, username, email, notifications } = response.data;
					localStorage.setItem('token', token);
					dispatch(setLogged(true));
					dispatch(setData({
						_id: _id,
						username: username,
						email: email,
					}));
					setNotifications(notifications);
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
			<Header notifications={notifications}></Header>
			<Navigation></Navigation>
			<main className="margin-20px back-secondary border-1">
				<Routes>
					{/*Home Page*/}
					<Route exact path='/' element={<Landing/>}></Route>
					{/*Logging and Registering*/}
					<Route exact path='/sign-up' element={<SigninForm/>}></Route>
					<Route exact path='/log-in' element={<LoginForm/>}></Route>
					{/*Profile*/}
					<Route exact path='/profile/:userId/*' element={<Suspense fallback={<Loading/>}><Profile/></Suspense>}></Route>
					<Route exact path='/profile/:userId/edit' element={<EditProfile/>}></Route>
					{/*Events*/}
					<Route exact path='/events' element={<Suspense fallback={<Spinner/>}><Events></Events></Suspense>}></Route>
					<Route exact path='/events/:eventId' element={<Suspense fallback={<Spinner/>}><Event></Event></Suspense>}></Route>
					<Route exact path='/add-event' element={<AddEvent/>}></Route>
					{/*Teams*/}
					<Route exact path='/teams' element={<Suspense fallback={<Loading/>}><Teams/></Suspense>}></Route>
					<Route exact path='/teams/:teamId/*' element={<Suspense fallback={<Loading/>}><Team/></Suspense>}></Route>
					<Route exact path='/team-form' element={<Suspense fallback={<Loading/>}><TeamForm/></Suspense>}></Route>
					<Route exact path='/team-form/:teamId' element={<Suspense fallback={<Loading/>}><TeamForm/></Suspense>}></Route>
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App;
