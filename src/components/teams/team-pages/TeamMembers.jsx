import UserCard from '../../assets/UserCard';
import {Container, Row} from "react-bootstrap";
import axios from "axios";
import {use} from "react";

async function fetchMembers(ids) {
    try {
        const response = await axios.post('http://localhost:5000/api/users/user-card/by-ids', { ids });
        return response.data;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error;
    }
}

export function TeamMembers ({members}) {
    const membersData = use(fetchMembers(members))

    return (
        <Container>
            {membersData.map(memberData => (
                <UserCard key={memberData._id} memberData={memberData}/>
            ))}
        </Container>
    )
}