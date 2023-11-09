import './Header.scss';

function Header () {
    return (
        <header className='bg-neutral margins h-40 display-row'>
            <div>
                <h1 className='text-white'>Logo</h1>
                <h3 className='text-white'>Welcome to airsoft community</h3>
            </div>
            <div className='display-row'>
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn m-1">Language</label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a className='text-white'>English</a></li>
                        <li><a className='text-white'>Russian</a></li>
                    </ul>
                </div>
                <button class="btn btn-outline btn-primary ml-2">Log In</button>
                <button class="btn btn-secondary ml-2.5">Sign Up</button>
            </div>
        </header>
    )
}

export default Header;