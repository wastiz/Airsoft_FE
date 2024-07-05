import {Col, Image, Row} from "react-bootstrap";

export function PostTeamCard ({postData: { name, created, coverPhoto, members}}) {
    return (
        <Row>
            <Col lg={8}>
                <Image className={'team-banner-img'} src={coverPhoto} fluid></Image>
            </Col>
            <Col lg={4}>
                <h4>{name}</h4>
                <h6>{created}</h6>
                <h6>{members.length} members</h6>
                <h6>Location: Somewhere</h6>
                <button className={'btn btn-primary'}>View</button>
            </Col>
        </Row>
    )
}