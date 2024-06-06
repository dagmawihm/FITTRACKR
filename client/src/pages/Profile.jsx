import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import WorkOutProgram from "../components/WorkOutProgram";
import PersonalInfo from "../components/PersonalInfo";
import Friends from "../components/Friends";
import { faGear, faUser, faDumbbell, faInfo, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;


function Profile({setUser}) {
    const [userData, setUserData] = useState({});
    
    const [sendReq, setSendReq] = useState(false);
    

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('/user/profile');
                if (response.data.message === 'successfull') {
                    setUserData (response.data.user);
                }
            }
            catch (e) {
                if (e.response && e.response.status === 401) {
                    setUser(false);
                }
            }
    
        }
        getProfile();
    },[setUser, sendReq]);

    const [tabs, setTabs] = useState({ personalInfo: true, workOutProgram: false, friends: false });

    const handleTabs = (e) => {
        const clickedTab = e.currentTarget.getAttribute('name');
        setTabs({
            personalInfo: clickedTab === 'personalInfo',
            workOutProgram: clickedTab === 'workOutProgram',
            friends: clickedTab === 'friends',
        });
    };

    const getClassName = (tabName) => {
        return tabs[tabName] ? 'bg-slate-500 rounded-xl py-1 px-2' : '';
    };

    return (
        <>
            <div className="my-5 bg-gray-700 rounded-2xl text-white p-5">
                <div className="flex flex-col gap-7">
                    <div className="flex flex-row justify-evenly">
                        <div className="flex flex-row gap-3 w-8/12">
                            <FontAwesomeIcon className=" w-14 h-14" icon={faUser} />
                            <h2 className="mt-5">{userData.firstName} {userData.lastName}</h2>
                        </div>
                        <div className="">
                            <NavLink to={"/settings"}><FontAwesomeIcon className=" w-6 h-6 mt-5" icon={faGear} /></NavLink>
                        </div>
                    </div>

                    <div className="flex flex-row justify-around">
                        <span name="personalInfo" onClick={handleTabs} className={getClassName('personalInfo')}>My Info <FontAwesomeIcon className=" w-3 h-3 mb-1" icon={faInfo} /></span>
                        <span name="workOutProgram" onClick={handleTabs} className={getClassName('workOutProgram')}>Work Out Program <FontAwesomeIcon className=" w-4 h-4 mb-0" icon={faDumbbell} /></span>
                        <span name="friends" onClick={handleTabs} className={getClassName('friends')}>Friends <FontAwesomeIcon className=" w-3 h-3 mb-1" icon={faUserGroup} /></span>
                    </div>
                </div>
            </div>

            {tabs.personalInfo && (
                <PersonalInfo userData={userData} setSendReq={setSendReq} sendReq={sendReq}/>
            )}

            {tabs.workOutProgram && (
                <WorkOutProgram setSendReq={setSendReq} sendReq={sendReq} exercises={userData.exercises} />
            )}

            {tabs.friends && (
                <Friends />
            )}

            <Footer />
        </>
    );
}


export default Profile