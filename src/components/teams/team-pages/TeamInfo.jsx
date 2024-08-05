export function TeamInfo({ teamData }) {
    const [author, created, description, rules] = teamData;
    return (
        <>
            <h3>About the team</h3>
            <p>created by <b>{author}</b> at <b>{created}</b></p>
            <p>{description}</p>
            <p>{rules}</p>
        </>
    );
}