export function ProfileInfo({profileStates : {firstName, lastName, age, phone, aboutMe, roles, team, favWeapon}}) {
    return (
        <>
            <h2><b>General Info</b></h2>
            <p>First name: {firstName ? firstName : "Not provided"}</p>
            <p>Last name: {lastName ? lastName : "Not provided"}</p>
            <p>Age: {age ? age : "Not provided"}</p>
            <p>First name: {firstName ? firstName : "Not provided"}</p>
            <p>First name: {firstName ? firstName : "Not provided"}</p>
            <p>First name: {firstName ? firstName : "Not provided"}</p>
            <p>First name: {firstName ? firstName : "Not provided"}</p>
        </>
    )
}