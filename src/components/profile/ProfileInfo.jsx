export function ProfileInfo({profileData : {firstName, lastName, age, phone, aboutMe, roles, team, favWeapon}}) {
    return (
        <>
            <h2><b>General Info</b></h2>
            <p>First name: {firstName ? firstName : "Not provided"}</p>
            <p>Last name: {lastName ? lastName : "Not provided"}</p>
            <p>Age: {age ? age : "Not provided"}</p>
            <p>Phone number: {phone ? phone : "Not provided"}</p>
            <p>About Me: {aboutMe ? aboutMe : "Not provided"}</p>
            <p>Roles: {roles[0] ? roles[0] : "Not provided"}</p>
            <p>Team: {team[0] ? team[0] : "Not provided"}</p>
            <p>Favourite Weapon: {favWeapon ? favWeapon : "Not provided"}</p>
        </>
    )
}