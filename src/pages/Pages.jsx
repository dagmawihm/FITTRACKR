import React from "react";
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Settings from "./Settings";
import Profile from "./Profile";
import Notification from "./Notification";
import { Routes, Route } from 'react-router-dom'

function Pages() {
    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/Notification' element={<Notification/>} />
        </Routes>
        </>
    )
}

export default Pages
