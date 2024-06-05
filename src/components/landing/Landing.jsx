import './Landing.scss';
import {LandingSection} from "./LandingSection";
import pinkWeapon from "../../img/pink-weapon.jpg";

function Landing () {
    return (
        <>
            <LandingSection reversed={false} img={pinkWeapon} text="Some text will be here and of course button to this button" btnText='Check it out!'/>
            <LandingSection reversed={true} img={pinkWeapon} text="Some text will be here and of course button to this button" btnText='Check it out!'/>
            <LandingSection reversed={false} img={pinkWeapon} text="Some text will be here and of course button to this button" btnText='Check it out!'/>
        </>
    )
}

export default Landing