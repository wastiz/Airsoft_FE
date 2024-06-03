import './Profile.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setData, setLogged} from '../../redux/slices/currentDataSlice'
import { setProfileData} from "../../redux/slices/editProfileSlice";
import {Link, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../img/avatar.jpg'
import {Col, Container, Row, Image, Nav, Button} from "react-bootstrap";
import {ProfileInfo} from './ProfileInfo';
import {ProfilePosts} from "./ProfilePosts";


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
        <Container className='padding-20px'>
            <Row className={'width-100'}>
                <Col xs lg='2'>
                    <Image className='avatar' src={profileStates.avatar ? profileStates.avatar : defaultAvatar} roundedCircle fluid={true}/>
                </Col>
                <Col></Col>
                <Col xs lg='2'>
                    <h3 className='text-white text-xl'>Username:</h3>
                    <h3 className='text-white text-3xl'><b>{currentStates.username}</b></h3>
                    <Link to={"/profile-edit"}>
                        <Button variant={'primary'}>Edit Profile</Button>
                    </Link>
                </Col>
            </Row>
            <Row className={'width-100 margin-20px'}>
                <Nav fill variant="tabs" defaultActiveKey="profile/user-info">
                    <Nav.Item>
                        <Nav.Link>
                            <Link to=""> General Info</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="user-posts">Posts</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="something">Something</Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <Link to="disabled" disabled>Other</Link>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row>
                <Routes>
                    <Route exact path='' element={<ProfileInfo profileStates={profileStates}/>}></Route>
                    <Route exact path='user-posts' element={<ProfilePosts/>}></Route>
                    <Route exact path='user-posts' element={<ProfilePosts/>}></Route>
                </Routes>
            </Row>
        </Container>
    )
}

export default Profile;