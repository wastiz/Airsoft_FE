import './App.css';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Landing from '../landing/Landing';
import Teams from '../teams/Teams';
import SigninForm from '../signinForm/SigninForm';
import LoginForm from '../loginForm/LoginForm';
import {BrowserRouter, Routes, Route,} from 'react-router-dom'


function App () {

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
					</Routes>
				</main>
			</div>
		</BrowserRouter>
  	);
}

export default App;
