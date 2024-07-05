import './Teams.scss';
import {Alert, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Input} from "../assets/Input";
import {Textarea} from "../assets/Textarea";
import axios from "axios";
import {FormSubmitting} from "../assets/FormSubmitting";
import placeholder from "../../img/placeholder.png";
import {useSelector} from "react-redux";

function AddTeam () {
    const currentStates = useSelector(states => states.current);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm()

    const onSubmit = async (data) => {

        const coverFormData = new FormData();
        if (coverTeamImageFile) {
            coverFormData.append('coverImage', coverTeamImageFile);
        }
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
    const [coverTeamImageFile, setCoverTeamImageFile] = useState();

    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverTeamImageFile(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverTeamImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                        <Image fluid src={coverTeamImageSrc ? coverTeamImageSrc : placeholder} alt="cover"/>
                    </Col>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload cover image for your event</Form.Label>
                            <Form.Control type="file" name={'cover-upload'} onChange={handleChangeFile}
                                          id={'cover-upload'}/>
                        </Form.Group>
                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB (Recommended to use wide image)</p>
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