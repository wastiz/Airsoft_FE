import {Link} from 'react-router-dom'

function Navbar () {
    return (
        <nav className="bg-neutral margins h-16 display-row">
            <Link to='/' className="text-white ml-2.5">Home</Link>
            <Link to='/teams' className="text-white ml-2.5">Teams</Link>
            <p href='#' className="text-white ml-2.5">News</p>
            <p href='#' className="text-white ml-2.5">Places</p>
            <div class="dropdown dropdown-end ml-2.5">
                <label tabindex="0" class="btn m-1">Other forums</label>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><p href='#' className="text-white">News</p></li>
                    <li><p href='#' className="text-white">Shop</p></li>
                    <li><p href='#' className="text-white">Shop</p></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar