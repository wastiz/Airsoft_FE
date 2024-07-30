import './Profile.scss';
import React, {Suspense, use, useState} from 'react';
import {useSelector } from 'react-redux';
import {Link, Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
import defaultAvatar from '../../img/avatar.jpg'
import {Col, Container, Row, Image, Nav, Button} from "react-bootstrap";
import {ProfileInfo} from './ProfileInfo';
import {ProfilePosts} from "./ProfilePosts";
import {Loading} from "../assets/Loading";


function Profile () {
    const navigate = useNavigate();
    const currentStates = useSelector((state) => state.current);
    const location = useLocation();
    const { userId } = useParams();

    const profileData = use(fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json()));


    const pathSegments = location.pathname.split('/');
    const activeTab = pathSegments[pathSegments.length - 1] === 'user-posts' ? 'user-posts' : 'general-info';

    const handleTabClick = (tab, path) => {
        navigate(path);
    };

    return (
        <Container className='padding-20px'>
            <Row className={'profile-header w-100'}>
                <Col xs lg='2'>
                    <Image className='avatar-15rem' src={profileData.avatar ? profileData.avatar : defaultAvatar} roundedCircle/>
                </Col>
                <Col></Col>
                <Col xs lg='2'>
                    <h3 className='text-white text-xl'>Username:</h3>
                    <h3 className='text-white text-3xl'><b>{currentStates.username}</b></h3>
                    {userId === currentStates._id ? (
                        <Link to={'edit/'}>
                            <Button variant={'primary'}>Edit Profile</Button>
                        </Link>
                    ) : null}
                </Col>
            </Row>
            <Row className={'w-100 mt-4'}>
                <Nav fill variant="tabs" defaultActiveKey="profile/user-info">
                    <div
                        className={`nav-item ${activeTab === 'general-info' ? 'tab-active' : ''}`}
                        onClick={() => handleTabClick('general-info', '')}
                    >
                        <Link role="button" className="nav-link" tabIndex={0} to="">
                            <b>General Info</b>
                        </Link>
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'user-posts' ? 'tab-active' : ''}`}
                        onClick={() => handleTabClick('user-posts', 'user-posts')}
                    >
                        <Link role="button" className="nav-link" tabIndex={0} to="user-posts">
                            <b>Posts</b>
                        </Link>
                    </div>
                </Nav>
            </Row>
            <Row className={'mt-4'}>
                <Routes>
                    <Route exact path='' element={<ProfileInfo profileData={profileData}/>}></Route>
                    <Route exact path='user-posts' element={<Suspense fallback={<Loading/>}><ProfilePosts userId={userId}/></Suspense>}></Route>
                </Routes>
            </Row>
        </Container>
    )
}

export default Profile;