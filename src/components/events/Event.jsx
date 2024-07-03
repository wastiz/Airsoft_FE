import './Events.scss';
import {useParams} from 'react-router-dom';
import { use } from 'react'
import {useForm} from "react-hook-form";
import {Carousel, Col, Container, Form, Row, Image} from "react-bootstrap";
import {Input} from "../assets/Input";
import {Select} from "../assets/Select";
import {Textarea} from "../assets/Textarea";
import * as PropTypes from "prop-types";

function ExampleCarouselImage(props) {
    return null;
}

ExampleCarouselImage.propTypes = {text: PropTypes.string};

function Event() {
    const {eventId} = useParams();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        console.log('Submitted')
    }

    const eventData = use(fetch(`http://localhost:5000/api/events/${eventId}`).then(res => res.json()))

    const {
        created,
        title,
        description,
        rules,
        gamePlot,
        date,
        price,
        location,
        ageRestriction,
        times : {meeting, briefing, start, end},
        services: {foodService, hpaService, toiletService, shopService, otherService},
        photos: {coverPhoto, otherPhoto},
        regForm: {firstName, lastName, nickname, email, phone, age, arbitraryContent},
        orgFirstName,
        orgLastName,
        orgEmail
    } = eventData

    console.log(arbitraryContent[0].textarea)

    return (
        <>
            <Container fluid className="event-banner h-20rem margin-padding-0">
                <Row>
                    <Col>
                        <h2>{title}</h2>
                    </Col>
                    <Col>
                        <h2>register here please</h2>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={'margin-20px w-100'}>
                <Row>
                    <Col lg={8}>
                        <h4>Date of the game:</h4>
                        <p className='text-white'>{date}</p>
                        <h4>Price:</h4>
                        <p className='text-white'>{price}</p>
                        <h4>Location:</h4>
                        <p className='text-white'>{location}</p>
                        <div className={'event-block mb-3'}>
                            <h4>Time schedule:</h4>
                            {meeting ? <p className='text-white'>Meeting time: {meeting}</p> : null}
                            {briefing ? <p className='text-white'>Briefing time: {briefing}</p> : null}
                            <p className='text-white'>Start of the game: {start}</p>
                            {end ? <p className='text-white'>Game ends approximately: {end}</p> : null}
                        </div>
                        {description ? (
                            <div className={'event-block mb-3'}>
                                <h4>Event Description</h4>
                                <p>{description}</p>
                            </div>
                        ) : null}
                        {rules ? (
                            <div className={'event-block mb-3'}>
                                <h4>Game rules</h4>
                                <p>{rules}</p>
                            </div>
                        ) : null}
                        {gamePlot ? (
                            <div className={'event-block mb-3'}>
                                <h4>Game PLot</h4>
                                <p>{gamePlot}</p>
                            </div>
                        ) : null}
                        {otherPhoto ? (
                            <Carousel className={'mb-3 padding-20px'}>
                                {otherPhoto.map((photo, index) => (
                                    <Carousel.Item key={index} className="carousel-item">
                                        <Image className="d-block w-100" src={photo} alt="slide" fluid/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : null}
                        <div className={'event-block mb-3'}>
                            <p className='text-white'>{orgFirstName}</p>
                            <p className='text-white'>{orgLastName}</p>
                            <p className='text-white'>{orgEmail}</p>
                        </div>
                        <p>Post created: {created}</p>
                    </Col>
                    <Col lg={4} fluid>
                    <Form onSubmit={handleSubmit(onSubmit)} className={'event-block margin-20px'}>
                            <h3 className={'text-center'}>Registration to {title}</h3>
                            {firstName ?
                                <Input label='First name*' name='userFirstName' type='text' register={register}
                                       required='Your first name is required!' errors={errors}/>
                                : null}
                            {lastName ?
                                <Input label='Last name*' name='userLastName' type='text' register={register}
                                       required='Your last name is required!' errors={errors}/>
                                : null}
                            {nickname ?
                                <Input label='Your nickname for this game*' name='userNickname' type='text'
                                       register={register}
                                       required='Your nickname for this game is required!' errors={errors}/>
                                : null}
                            {email ?
                                <Input label='Your Email*' name='userEmail' type='text' register={register}
                                       required='Your email is required!' errors={errors}/>
                                : null}
                            {phone ?
                                <Input label='Phone number*' name='userPhone' type='text' register={register}
                                       required='Your phone number is required!' errors={errors}/>
                                : null}

                            {age ?
                                <Input label='Your real age' name='userAge' type='text' register={register}
                                       required='Your real age is required!' errors={errors}/>
                                : null}

                            {arbitraryContent[0].select ? (
                                arbitraryContent[0].select.map((item, index) => (
                                    <Select key={index} label={item[0]} options={item[1]} name={item[0]}
                                            register={register} required={'This field is required!'} errors={errors}
                                            control={control}/>
                                ))
                            ) : null}
                            {arbitraryContent[0].textarea ? (
                                arbitraryContent[0].textarea.map((item, index) => (
                                    <Textarea label={item} name={item} register={register}
                                              required={'This field is required!'} errors={errors}/>
                                ))
                            ) : null}
                            <div className={'flex flex-center'}>
                                <button className={'btn btn-primary'} type={'submit'}>Submit</button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Event