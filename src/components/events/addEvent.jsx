import './Events.scss';
import placeholder from '../../img/placeholder.png'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import {Input} from "../assets/Input";
import {Textarea} from "../assets/Textarea";
import {Checkbox} from "../assets/Checkbox";
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {FormSubmitting} from "../assets/FormSubmitting";


function AddEvent() {
    const currentStates = useSelector((state) => state.current);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const newId = uuidv4();

            const originalDate = new Date(data.date);
            const day = originalDate.getDate().toString().padStart(2, '0');
            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
            const year = originalDate.getFullYear().toString().slice(-2);
            const formattedDate = `${day}.${month}.${year}`;

            // Загрузка coverImage
            const coverFormData = new FormData();
            if (coverEventImageFile) {
                coverFormData.append('coverImage', coverEventImageFile);
            }
            const coverResponse = await axios.post('http://localhost:5000/api/events/uploadCoverImage', coverFormData);
            const coverImage = coverResponse.data;
            console.log('Cover image upload response:', coverImage);

            // Загрузка otherImages
            const otherFormData = new FormData();
            otherEventImageFiles.forEach((file, index) => {
                otherFormData.append('otherImages', file);
            });
            const otherResponse = await axios.post('http://localhost:5000/api/events/uploadOtherImage', otherFormData);
            const otherImages = otherResponse.data;
            console.log('Other images upload response:', otherImages); // Логируем ответ сервера

            // Проверяем наличие полей в ответах сервера
            if (!coverImage.url || !otherImages.urls) {
                throw new Error('Invalid response from server');
            }

            // Создание события
            const response = await axios.post('http://localhost:5000/api/events', {
                _id: newId,
                author: currentStates._id,
                title: data.title,
                description: data.description,
                rules: data.rules,
                gamePlot: data.gamePlot,
                date: formattedDate,
                price: data.price,
                location: data.location,
                ageRestriction: data.ageRestriction,
                times: {
                    meeting: data.meetingTime,
                    briefing: data.briefTime,
                    start: data.startTime,
                    end: data.endTime,
                },
                services: {
                    foodService: data.foodService,
                    hpaService: data.hpaService,
                    toiletService: data.toiletService,
                    shopService: data.shopService,
                    otherService: data.otherService,
                },
                photos: {
                    coverPhoto: coverImage.url,
                    otherPhoto: otherImages.urls,
                },
                regForm: {
                    firstName: data.regFirstName,
                    lastName: data.regLastName,
                    nickname: data.regNickname,
                    email: data.regEmail,
                    phone: data.regPhone,
                    age: data.regAge,
                    arbitraryContent: inputValues
                },
                orgFirstName: data.orgFirstName,
                orgLastName: data.orgLastName,
                orgEmail: data.orgEmail,
            });

            console.log(response.statusText);
            navigate('/events');
        } catch (error) {
            setError("root", {
                message: "Something happened creating your event"
            });
            console.error('Error submitting data to MongoDB:', error);
        }
    }


    //Обработка ковер картинки
    const [coverEventImageSrc, setCoverEventImageSrc] = useState();
    const [coverEventImageFile, setCoverEventImageFile] = useState();

    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverEventImageFile(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverEventImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Обработка остальных картинок

    const [otherEventImagesSrc, setOtherEventImagesSrc] = useState([]);
    const [otherEventImageFiles, setOtherEventImageFiles] = useState([]);

    const handleChangeFiles = (event) => {
        const files = Array.from(event.target.files); // Преобразуем FileList в массив
        files.forEach(file => {
            if (file) {
                setOtherEventImageFiles(prevFiles => [...prevFiles, file])
                const reader = new FileReader();
                reader.onloadend = () => {
                    setOtherEventImagesSrc(prevImages => [...prevImages, reader.result]);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    //Обработка полей с разными аттрибутами

    const [inputs, setInputs] = useState([]);

    const handleAddTextarea = () => {
        setInputs([...inputs, { type: 'textarea', id: `textarea${inputs.length}` }]);
    };

    const handleAddSelect = () => {
        setInputs([...inputs, { type: 'select', id: `select${inputs.length}`, options: ['option1'] }]);
    };

    const [inputValues, setInputValues] = useState();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleAddOption = (id) => {
        setInputs((prevInputs) =>
            prevInputs.map((input) =>
                input.id === id ? { ...input, options: [...input.options, `option${input.options.length + 1}`] } : input
            )
        );
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container className={'padding-20px'}>
                <p>Hey! This information will be displayed publicly so be careful what you share.</p>
                <Row>
                    <Input label='Event title*' name='title' type='text' register={register}
                           required='Event title is required!' errors={errors}/>
                </Row>
                <Row>
                    <Textarea label='Event description*' name='description'
                              description='Write description about your event' register={register}
                              required='Event description is required!' errors={errors}/>
                </Row>
                <Row>
                    <Textarea label='Event Rules*' name='eventRules' description='Write rules on your event'
                              register={register} required='Event rules are required!' errors={errors}/>
                </Row>
                <Row>
                    <Textarea label='Game plot' name='gamePlot' description='Write game plot on your game'
                              register={register} required={false} errors={errors}/>
                </Row>
                <Row>
                    <p>General info:</p>
                    <Col>
                        <Input label='Event Date*:' name='date' type='date' register={register}
                               required='Event Date is required!'
                               errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='Price(put zero if event is free to attend)*:' name='price' type='number'
                               register={register}
                               required='Price is required!' errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='Location*:' name='location' type='text' register={register}
                               required='Location is required!'
                               errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='Age Restriction(put zero if there is no age restriction)*:' name='ageRestriction'
                               type='number' register={register} required='Age Restriction is required!'
                               errors={errors}/>
                    </Col>
                </Row>
                <Row>
                    <p>Times:</p>
                    <Col>
                        <Input label='Meeting time:' name='meetingTime' type='time' register={register} required={false}
                               errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='Briefing time:' name='briefTime' type='time' register={register} required={false}
                               errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='Start time*:' name='startTime' type='time' register={register}
                               required="Start Time is required!" errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='End time:' name='endTime' type='time' register={register} required={false}
                               errors={errors}/>
                    </Col>
                </Row>
                <Row>
                    <p>Services:</p>
                    <Col>
                        <Checkbox label='Food on Game' name='foodService' type='checkbox'
                                  description='There will be food on the game' register={register} required={false}
                                  errors={errors}/>
                    </Col>
                    <Col>
                        <Checkbox label='HPA air service' name='hpaService' type='checkbox'
                                  description='There will be HPA air on the game' register={register} required={false}
                                  errors={errors}/>
                    </Col>
                    <Col>
                        <Checkbox label='Toilet' name='toiletService' type='checkbox'
                                  description='There will be toilet on the game'
                                  register={register} required={false} errors={errors}/>
                    </Col>
                    <Col>
                        <Checkbox label='Airsoft Shop' name='shopService' type='checkbox'
                                  description='There will be some shop on the game' register={register} required={false}
                                  errors={errors}/>
                    </Col>
                    <Col>
                        <Input label='Other service:' name='otherService' type='text' register={register}
                               required={false}
                               errors={errors}/>
                    </Col>
                </Row>

                {/*Cover photo*/}

                <Row>
                    <Col>
                        <Image fluid src={coverEventImageSrc ? coverEventImageSrc : placeholder} alt="cover"/>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload cover image for your event</Form.Label>
                            <Form.Control type="file" name={'cover-upload'} onChange={handleChangeFile}
                                          id={'cover-upload'}/>
                        </Form.Group>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                    </Col>
                </Row>
                <Row className={'g-3'}>
                    {/*Other photos, videos*/}

                    <Col>
                        {otherEventImagesSrc.length > 0 ? (
                            otherEventImagesSrc.map((src, index) => (
                                <Image key={index} src={src} alt={`uploaded ${index}`} fluid/>
                            ))
                        ) : (
                            <Image src={placeholder} alt="placeholder" fluid/>
                        )}
                    </Col>
                    <Col>
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Upload other files (for example game field)</Form.Label>
                            <Form.Control type="file" name={'other-upload'} multiple
                                          onChange={handleChangeFiles}/>
                        </Form.Group>
                        <p>PNG, JPG, GIF up to 10MB each</p>
                    </Col>
                </Row>
                <div className={'flex flex-column'}>
                    <h2>Registration fields</h2>
                    <p>Set fields that will be displayed, when user will register</p>
                    <Checkbox label='First name' name='regFirstName' type='checkbox' description="Player's first name"
                              register={register} required={false} errors={errors}/>
                    <Checkbox label='Last name' name='regLastName' type='checkbox' description="Player's last name"
                              register={register} required={false} errors={errors}/>
                    <Checkbox label='Nickname' name='regNickname' type='checkbox'
                              description="Player's nickname (can be used from his profile)" register={register}
                              required={false} errors={errors}/>
                    <Checkbox label='Email' name='regEmail' type='checkbox' description="Player's email"
                              register={register}
                              required={false} errors={errors}/>
                    <Checkbox label='Phone' name='regPhone' type='checkbox' description="Player's phone number"
                              register={register} required={false} errors={errors}/>
                    <Checkbox label='Age' name='regAge' type='checkbox' description="Player's age" register={register}
                              required={false} errors={errors}/>
                    <Checkbox label='Arbitraty information' name='regArbitrary' type='checkbox'
                              description="You can request optional info from player (for example team)"
                              register={register}
                              required={false} errors={errors}/>
                    {watch("regArbitrary") ? (
                        <div className='flex flex-row gap-2'>
                            <button type='button' className="btn btn-primary" onClick={handleAddTextarea}>Add Textarea
                            </button>
                            <button type='button' className="btn btn-primary" onClick={handleAddSelect}>Add Select
                            </button>
                        </div>
                    ) : null}
                    {inputs.map((input) => {
                        if (input.type === 'textarea') {
                            return (
                                <div key={input.id} className='flex flex-col'>
                                    <label className='text-white' htmlFor={input.id}>You have added textarea to
                                        registration
                                        form, type what player should write in this textarea</label>
                                    <input
                                        onChange={(e) => handleInputChange(e, input.id)}
                                        id={input.id}
                                        name={input.id}
                                        className="common-input-class text-black"
                                    />
                                </div>
                            );
                        } else if (input.type === 'select') {
                            return (
                                <div key={input.id} className='flex flex-column gap-2'>
                                    <label htmlFor={input.id}>You have added select options to registration form, type
                                        options
                                        that player will have to choose (for example team)</label>
                                    <input
                                        type="text"
                                        onChange={(e) => handleInputChange(e, input.id)}
                                        id={input.id}
                                        name={input.id}
                                        className="common-input-class text-black"
                                    />
                                    {input.options.map((option, index) => (
                                        <div key={`${input.id}-option-${index}`}>
                                            <label className='text-white'>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}:
                                                <input
                                                    type="text"
                                                    name={`${input.id}-option-${index}`}
                                                    className="common-input-class text-black"
                                                    onChange={handleInputChange}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                    <button type="button" className='btn btn-primary'
                                            onClick={() => handleAddOption(input.id)}>Add
                                        Option
                                    </button>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className={'flex flex-column'}>
                    <h2>Information about Organisers</h2>
                    <p>Use a permanent address where you can receive mail.</p>
                    <Input label='First name*' name='orgFirstName' type='text' register={register}
                           required={"Organiser's first name is required"} errors={errors}/>
                    <Input label='Last name*' name='orgLastName' type='text' register={register}
                           required={"Organiser's last name is required"} errors={errors}/>
                    <Input label='Email*' name='orgEmail' type='email' register={register}
                           required={"Organiser's email is required"} errors={errors}/>
                </div>

                <div className={'flex flex-row gap-3 justify-content-end'}>
                    <button className='btn btn-danger' type='button'>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>

                <FormSubmitting
                    isSubmitting={isSubmitting}
                    errors={errors}
                    isSubmitSuccessful={isSubmitSuccessful}
                    successText={'Event created successfully'}
                />
            </Container>
        </Form>
    )
}

export default AddEvent;