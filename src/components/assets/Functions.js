import axios from "axios";

// Function to add notification to user
export async function addNotification(type, content) {
    try {
        await axios.post(`http://localhost:5000/api/users/notification/add`, {
            type: type,
            content: content
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error(`Failed to add notification: ${error}`);
        throw error;
    }
}

// Function to add user to team
export async function addTeamMember(teamId, userId) {
    try {
        await axios.post(`http://localhost:5000/api/teams/joining`, {
            teamId: teamId,
            userId: userId,
        });
        await addNotification("team_joined", { teamId: teamId, joinedId: userId });
    } catch (error) {
        console.error(`Failed to add team member: ${error}`);
        throw error;
    }
}

// Function to add user to pending members of team
export async function addPendingMember(teamId, userId) {
    try {
        await axios.post(`http://localhost:5000/api/teams/pending`, {
            teamId: teamId,
            userId: userId
        });
        await addNotification('team_join_request', { teamId: teamId, senderId: userId });
    } catch (error) {
        console.error(`Failed to add pending member: ${error}`);
        throw error;
    }
}
