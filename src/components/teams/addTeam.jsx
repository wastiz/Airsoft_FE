import './Teams.scss';
import {Alert, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useForm} from "react-hook-form";
import {Input} from "../assets/Input";
import {Textarea} from "../assets/Textarea";
import axios from "axios";

function AddTeam () {
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
            const response = await axios.post('http://localhost:5000/api/events', {
                name: data.name,
                description: data.description,
                number: data.number,
            })
            navigate('/teams')
        } catch (error) {
            setError("root", {
                message: "Something happened handling your events"
            });
            console.error('Error submitting data to MongoDB:', error);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Row>
                    <Input label='Team Name*' name='name' type='text' register={register}
                           required='Event title is required!' errors={errors}/>
                    <Textarea label='Team description*' name='description' description='Write description about your team'
                              register={register} required='Team description are required!' errors={errors}/>
                    <Input label='Number of members can join (put 0 if unlimited)*:' name='number' type='number'
                           register={register} required='Number is required!' errors={errors}/>
                </Row>


                <div className={'flex flex-row gap-3 justify-content-end'}>
                    <button className='btn btn-danger' type='button'>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>

                {isSubmitting ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    : null}

                {errors.root && (
                    <Alert key={'danger'} variant={'danger'}>
                        {errors.root.message}
                    </Alert>
                )}
                {isSubmitSuccessful ?
                    <Alert key={'success'} variant={'success'}>
                        Yey! You have uploaded smth!
                    </Alert>
                    : null}
            </Container>
        </Form>
    )
}

export default AddTeam;