import {Col, Row, Image} from "react-bootstrap";

export function TeamCard({teamData : {name, created, members, coverPhoto}}) {
    return (
        <Row className={'h-15rem margin-20px mb-5'}>
            <Col lg={10} className={'team-banner-column'}>
                <Image className={'team-banner-img'} src={coverPhoto} fluid></Image>
            </Col>
            <Col lg={2} className={'team-banner-info'}>
                <h4>{name}</h4>
                <h6>{created}</h6>
                <h6>{members.length} members</h6>
                <h6>Location: Somewhere</h6>
                <button className={'btn btn-primary'}>View</button>
            </Col>
        </Row>
    )
}