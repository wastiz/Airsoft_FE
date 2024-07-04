import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {use} from "react";

export function ProfilePosts () {
    const currentStates = useSelector((state) => state.current);
    const posts = use(
        fetch(`http://localhost:5000/api/users/profile/posts?id=${currentStates._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
    );
    console.log(posts);
    return (
        <Container>
            <h1>Posts</h1>
        </Container>
    )
}