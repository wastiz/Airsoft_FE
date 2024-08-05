import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {use} from "react";
import {PostEventCard} from "./PostEventCard";
import {PostTeamCard} from "./PostTeamCard";

export function ProfilePosts ({userId}) {

    const posts = use(
        fetch(`http://localhost:5000/api/users/profile/posts/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
    );

    return (
        <Container>
            {posts.map(postData => (
                postData.title ? (
                    <PostEventCard key={postData._id} postData={postData} />
                ) : <PostTeamCard key={postData._id} postData={postData} />
            ))}
        </Container>
    )
}