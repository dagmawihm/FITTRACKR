import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Settings from "./Settings";
import Profile from "./Profile";
import Notification from "./Notification";
import Header from "../components/Header";

axios.defaults.withCredentials = true;

function Pages() {


    const location = useLocation();
    const [user, setUser] = useState(true);


    const auth = async () => {
        try {
            const response = await axios.post('/user/auth');
            setUser(response.data.authenticated);
        }
        catch (e) {
            setUser(false);
        }

    }

    const isRestrictedPath =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup") 

    

    useEffect(() => {
        if (isRestrictedPath) {
            auth();
        }
    }, [isRestrictedPath]);


    return (
        <>
            <div className=" w-full flex justify-center">
                <div className=" w-11/12 my-2">
                    <div><Header setUser={setUser} user={user} /></div>
                    <Routes>
                        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
                        <Route path='/login' element={user ? <Navigate to='/' /> : <Login setUser={setUser} />} />
                        <Route path='/signup' element={user ? <Navigate to='/' /> : <SignUp setUser={setUser} />} />
                        <Route path='/settings' element={user ? <Settings /> : <Navigate to='/login' />} />
                        <Route path='/profile' element={user ? <Profile setUser={setUser} /> : <Navigate to='/login' />} />
                        <Route path='/Notification' element={user ? <Notification /> : <Navigate to='/login' />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Pages
