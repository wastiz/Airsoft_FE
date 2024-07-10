import './Teams.scss'
import {Link} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap";
import {TeamCard} from './TeamCard';
import {useSelector} from "react-redux";
import {use} from "react";

function Teams () {

    const currentStates = useSelector((state) => state.current)

    const teams = use(fetch('http://localhost:5000/api/teams').then(res => res.json()))

    return (
        <>
            {currentStates.logged ? (
                <Link to={'/team-form'}>
                    <button className={'btn btn-primary'}>Add Team</button>
                </Link>
            ) : <h3>You have to be logged in to add teams</h3>}
            <Container fluid>
                {teams.map(item => {
                    return (
                        <TeamCard key={item._id} teamData={item}></TeamCard>
                    )
                })}
            </Container>
        </>
    )
}

export default Teams;