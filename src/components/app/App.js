import './App.css';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Landing from '../landing/Landing';
import Teams from '../teams/Teams';
import SigninForm from '../signinForm/SigninForm';
import LoginForm from '../loginForm/LoginForm';
import Profile from '../profile/Profile';
import Events from '../events/Events';
import AddEvent from '../addEvent/addEvent';
import Event from '../event/Event';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setState} from '../../redux/slices'


function App () {
	const id = localStorage.getItem('id');
	const dispatch = useDispatch();
	if (id) {
		dispatch(setState(true))
	}
  	return (
		<BrowserRouter>
			<div className='bg-base-100'>
				<Header></Header>
				<Navbar></Navbar>
				<main className="margins bg-neutral h-auto">
					<Routes>
						<Route exact path='/' element={<Landing/>}/ >
						<Route exact path='/teams' element={<Teams/>}/ >
						<Route exact path='/sign-up' element={<SigninForm/>}/ >
						<Route exact path='/log-in' element={<LoginForm/>}/ >
						<Route exact path='/profile/:userId' element={<Profile/>}/ >
						<Route exact path='/events' element={<Events/>}/>
						<Route exact path='/add-event' element={<AddEvent/>}></Route>
						<Route exact path='/events/:eventId' element={<Event/>}></Route>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
  	);
}

export default App;
