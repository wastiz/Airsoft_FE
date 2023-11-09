import './App.css';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import Main from '../main/Main';

function App() {
  	return (
    	<div className='bg-base-100'>
      		<Header></Header>
			<Navbar></Navbar>
			<Main></Main>
    	</div>
  	);
}

export default App;
