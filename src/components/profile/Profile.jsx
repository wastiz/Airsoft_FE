import './Profile.scss';
import React, {Suspense, use, useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setData, setLogged} from '../../redux/slices/currentDataSlice'
import { setProfileData} from "../../redux/slices/editProfileSlice";
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../img/avatar.jpg'
import {Col, Container, Row, Image, Nav, Button} from "react-bootstrap";
import {ProfileInfo} from './ProfileInfo';
import {ProfilePosts} from "./ProfilePosts";
import {Loading} from "../assets/Loading";


function Profile () {
    const navigate = useNavigate();
    const currentStates = useSelector((state) => state.current);

    const profileData = use(fetch('http://localhost:5000/api/users/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json()));

    const [activeTab, setActiveTab] = useState('general-info');

    const handleTabClick = (tab, path) => {
        setActiveTab(tab);
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
                    <Link to={"/profile-edit"}>
                        <Button variant={'primary'}>Edit Profile</Button>
                    </Link>
                </Col>
            </Row>
            <Row className={'w-100 margin-20px'}>
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
            <Row>
                <Routes>
                    <Route exact path='' element={<ProfileInfo profileData={profileData}/>}></Route>
                    <Route exact path='user-posts' element={<Suspense fallback={<Loading/>}><ProfilePosts/></Suspense>}></Route>
                </Routes>
            </Row>
        </Container>
    )
}

export default Profile;