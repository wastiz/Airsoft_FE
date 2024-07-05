import {Col, Image, Row} from "react-bootstrap";

export function PostEventCard ({postData: {title, created, date, photos: {coverPhoto}}}) {
    return (
        <Row>
            <Col lg={8}>
                <Image className={'team-banner-img'} src={coverPhoto} fluid></Image>
            </Col>
            <Col lg={4}>
                <h4>{title}</h4>
                <h6>{created}</h6>
                <h6>Date of event: {date}</h6>
                <h6>Location: Somewhere</h6>
                <button className={'btn btn-primary'}>View</button>
            </Col>
        </Row>
    )
}