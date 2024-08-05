import {Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export function PostTeamCard ({postData: { _id, name, created, coverPhoto, members}}) {
    return (
        <Row className={'user-post-card'}>
            <Col lg={8} className={'mh-100'}>
                <Image className={'team-banner-img'} src={coverPhoto} fluid></Image>
            </Col>
            <Col lg={4}>
                <h4>{name}</h4>
                <h6>{created}</h6>
                <h6>{members.length} members</h6>
                <h6>Location: Somewhere</h6>
                <Link to={`/teams/${_id}`}>
                    <button className={'btn btn-primary'}>View</button>
                </Link>
            </Col>
        </Row>
    )
}