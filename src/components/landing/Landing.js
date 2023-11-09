import './Landing.scss';
import pinkWeapon from '../../img/pink-weapon.jpg';


function Landing () {
    return (
        <>
        <section className="display-row justify-between margins">
            <img className='landing-image' src={pinkWeapon} alt="" />
            <div>
                <p className='text-white text-lg'>Here would be some text and some link to page (the link is in the button)</p>
                <button className="btn btn-primary">Secondary</button>
            </div>
        </section>
        <section className="display-row justify-between margins">
            <div>
                <p className='text-white text-lg'>Here would be some text and some link to page (the link is in the button)</p>
                <button className="btn btn-secondary">Secondary</button>
            </div>
            <img className='landing-image' src={pinkWeapon} alt="" />
        </section> 
        </>
    )
}

export default Landing