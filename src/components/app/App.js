import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Landing from '../landing/Landing';
import Teams from '../teams/Teams';
import SigninForm from '../signinForm/SigninForm';
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../../redux/store'

function App () {
	const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/api/users');
                setUsers(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

  	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className='bg-base-100'>
					<Header></Header>
					<Navbar></Navbar>
					<main className="margins bg-neutral h-auto">
						<Routes>
							<Route exact path='/' element={<Landing/>}/ >
							<Route exact path='/teams' element={<Teams/>}/ >
							<Route exact path='/sign-up' element={<SigninForm/>}/ >
						</Routes>
						<div>
							<h1>List of Users</h1>
							<ul>
								{users.map(user => (
									<li key={user._id}>{user.username} - {user.email}</li>
								))}
							</ul>
						</div>
					</main>
				</div>
			</BrowserRouter>
		</Provider>
  	);
}

export default App;
