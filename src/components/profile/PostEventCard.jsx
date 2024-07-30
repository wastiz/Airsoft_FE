import {Col, Image, Row} from "react-bootstrap";

export function PostEventCard ({postData: {title, created, date, photos: {coverPhoto}}}) {
    return (
        <Row className={'user-post-card'}>
            <Col lg={8} className={'mh-100'}>
                <Image src={coverPhoto} fluid></Image>
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