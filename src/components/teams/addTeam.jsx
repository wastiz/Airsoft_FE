import './Teams.scss';
import {Alert, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {Input} from "../assets/Input";
import {Textarea} from "../assets/Textarea";
import axios from "axios";
import {FormSubmitting} from "../assets/FormSubmitting";
import placeholder from "../../img/placeholder.png";
import {useSelector} from "react-redux";
import ReactCrop, {centerCrop, convertToPixelCrop, makeAspectCrop,} from "react-image-crop";
import setCanvasPreview from "../assets/setCanvasPreview";

function AddTeam () {
    const currentStates = useSelector(states => states.current);
    const navigate = useNavigate();

    const ASPECT = 16/3; // Задает пропорции кропу. 1 - квадрат. 6/19 прямоугльник к примеру
    const DIMENSION = 90; //Задает начальные размеры кропа в пикселях
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm()

    const onSubmit = async (data) => {

        const coverFormData = new FormData();
        const blob = await fetch(previewCanvasRef.current.toDataURL()).then(res => res.blob());
        const file = new File([blob], "image.png", { type: "image/png" });
        coverFormData.append('coverImage', file);

        const coverResponse = await axios.post('http://localhost:5000/api/teams/uploadTeamCoverImage', coverFormData);

        try {
            const response = await axios.post('http://localhost:5000/api/teams', {
                author: currentStates._id,
                name: data.name,
                description: data.description,
                rules: data.rules,
                memberLimit: data.limit,
                coverPhoto: coverResponse.data.url,
                members: [currentStates._id],
            })
            console.log(response.statusText)
            navigate('/teams')
        } catch (error) {
            setError("root", {
                message: "Something happened in creating your team"
            });
            console.error('Error submitting data to MongoDB:', error);
        }
    }

    const [coverTeamImageSrc, setCoverTeamImageSrc] = useState();

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            const {naturalWidth, naturalHeight} = e.currentTarget;
            if (naturalWidth < DIMENSION || naturalHeight < DIMENSION) {
                setError('cover-upload', {type: 'manual', message: 'Image should be at least 150 x 150 pixels'})
                setCoverTeamImageSrc(null)
                return;
            }
            reader.onloadend = () => {
                setCoverTeamImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [crop, setCrop] = useState()

    const onImageLoad = (e) => { //Создаем колбек который будет срабатывать после загрузки картинки чтобы сто проц создался объект кропа и передался
        const {width, height} = e.currentTarget;
        const crop = makeAspectCrop({
            unit: '%',
            width: DIMENSION,

        }, ASPECT, width, height);
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)
    }
    return (
        <Form className={'padding-20px'} onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Row>
                    <Input label='Team Name*' name='name' type='text' register={register}
                           required='Team name is required!' errors={errors}/>
                </Row>
                <Row>
                    <Textarea label='Team description*' name='description' description='Write description about your team'
                              register={register} required='Team description is required!' errors={errors}/>
                </Row>
                <Row>
                    <Textarea label='Team rules' name='rules' description='Write your team rules'
                              register={register} required={false} errors={errors}/>
                </Row>
                <Row>
                    <Input label='Number of members can join (put 0 if unlimited)*:' name='limit' type='number'
                           register={register} required='Number is required!' errors={errors}/>
                </Row>
                <Row>
                    <Col>
                        {coverTeamImageSrc ? (
                            <ReactCrop
                                crop={crop}
                                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                                keepSelection
                                aspect={ASPECT}
                                minWidth={DIMENSION}
                            >
                                <Image fluid ref={imgRef} className={'form-placeholder'} src={coverTeamImageSrc} alt="cover" onLoad={onImageLoad}/>
                            </ReactCrop>
                        ) : <Image fluid className={'form-placeholder'} src={placeholder} alt="cover"/>}
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload cover image for your event</Form.Label>
                            <Form.Control type="file" name={'cover-upload'} onChange={handleChangeFile}
                                          id={'cover-upload'}/>
                        </Form.Group>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB (Recommended to use wide
                            image)</p>
                        <button
                            className={'btn btn-primary'}
                            type={'button'}
                            onClick={() => {
                                setCanvasPreview(
                                    imgRef.current, // HTMLImageElement
                                    previewCanvasRef.current, // HTMLCanvasElement
                                    convertToPixelCrop(
                                        crop,
                                        imgRef.current.width,
                                        imgRef.current.height
                                    )
                                );
                            }}
                        >
                            Preview Image
                        </button>
                        {crop && <canvas ref={previewCanvasRef} className={'crop-preview mt-4'}/>}
                    </Col>
                </Row>

                <div className={'flex flex-row gap-3 justify-content-end'}>
                    <Link to='/teams'>
                        <button className='btn btn-danger' type='button'>Cancel</button>
                    </Link>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>

                <FormSubmitting
                    isSubmitting={isSubmitting}
                    errors={errors}
                    isSubmitSuccessful={isSubmitSuccessful}
                    successText={'Team created successfully'}
                />
            </Container>
        </Form>
    )
}

export default AddTeam;