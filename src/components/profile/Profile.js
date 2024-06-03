import './Profile.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setData, setLogged} from '../../redux/slices/currentDataSlice'
import { setProfileData} from "../../redux/slices/editProfileSlice";
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../img/avatar.jpg'
import {Col, Container, Row, Image, Nav} from "react-bootstrap";
import {findAllByDisplayValue} from "@testing-library/react";


function Profile () {
    const dispatch = useDispatch();
    const currentStates = useSelector((state) => state.current);
    const profileStates = useSelector((state) => state.profile);

    useEffect(() => {
        const auth = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                dispatch(setProfileData(response.data))
                dispatch(setLogged(true));
            } catch (e) {
                localStorage.removeItem('token');
                dispatch(setLogged(false));
            }
        };
        auth();
    }, [dispatch]);


    return (
            // <Container>
            //     <Row>
            //         <Col xs lg='2'>
            //             <Image className='avatar' src={profileStates.avatar ? profileStates.avatar : defaultAvatar} roundedCircle fluid={true}/>
            //         </Col>
            //         <Col></Col>
            //         <Col xs lg='2'>
            //             <h3 className='text-white text-xl'>Username:</h3>
            //             <h3 className='text-white text-3xl'><b>{currentStates.username}</b></h3>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Nav fill variant="tabs" defaultActiveKey="/home">
            //             <Nav.Item>
            //                 <Nav.Link href="/home">Active</Nav.Link>
            //             </Nav.Item>
            //             <Nav.Item>
            //                 <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
            //             </Nav.Item>
            //             <Nav.Item>
            //                 <Nav.Link eventKey="link-2">Link</Nav.Link>
            //             </Nav.Item>
            //             <Nav.Item>
            //                 <Nav.Link eventKey="disabled" disabled>
            //                     Disabled
            //                 </Nav.Link>
            //             </Nav.Item>
            //         </Nav>
            //     </Row>
            // </Container>
        <div className='padding-20px'>
            <Row className={'width-100'}>
                <Col xs lg='2'>
                    <Image className='avatar' src={profileStates.avatar ? profileStates.avatar : defaultAvatar} roundedCircle fluid={true}/>
                </Col>
                <Col></Col>
                <Col xs lg='2'>
                    <h3 className='text-white text-xl'>Username:</h3>
                    <h3 className='text-white text-3xl'><b>{currentStates.username}</b></h3>
                </Col>
            </Row>
            <Row className={'width-100'}>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
        </div>
    )
}

export default Profile;