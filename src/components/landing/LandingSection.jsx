import "./Landing.scss"
import { Container, Row, Col, Image } from 'react-bootstrap';

export function LandingSection({ reversed, img, text, btnText }) {
    return (
        <section className="flex flex-row justify-content-between margin-20px padding-20px">
            <Container>
                <Row>
                    {reversed ? (
                        <>
                            <Col>
                                <Image className='landing-img border-1' src={img} fluid />
                            </Col>
                            <Col className='ms-auto text-end'>
                                <p className='text-lg'>{text}</p>
                                <button className="btn btn-primary">{btnText}</button>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col className='ms-auto'>
                                <p className='text-lg'>{text}</p>
                                <button className="btn btn-primary">{btnText}</button>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Image className='landing-img border-1' src={img} fluid />
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </section>
    );
}