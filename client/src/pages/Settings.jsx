import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import MyInfo from "../components/MyInfo";
import Account from "../components/Account";
import Privacy from "../components/Privacy";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
axios.defaults.withCredentials = true;


function Settings({setUser}) {

    const [tabs, setTabs] = useState({ myInfo: true, account: false, privacy: false });
    const [userData, setUserData] = useState({});
    const [sendReq, setSendReq] = useState(false);

    const handleTabs = (e) => {
        const clickedTab = e.currentTarget.getAttribute('name');
        setTabs({
            myInfo: clickedTab === 'myInfo',
            account: clickedTab === 'account',
            privacy: clickedTab === 'privacy',
        });
    };

    const getClassName = (tabName) => {
        return tabs[tabName] ? 'bg-slate-500 rounded-xl py-1 px-2' : '';
    };

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

    return (
        <>
            <div className="my-5 bg-gray-700 rounded-2xl text-white py-4">
                <div className="flex flex-col gap-5">

                    <div className="flex justify-center">
                        <h1 className="  text-2xl">Settings <FontAwesomeIcon className=" w-5 h-5" icon={faGear} /></h1>
                    </div>



                    <div className="flex flex-row justify-around">
                        <span name="myInfo" onClick={handleTabs} className={getClassName('myInfo')}>My Info</span>
                        <span name="account" onClick={handleTabs} className={getClassName('account')}>Account</span>
                        <span name="privacy" onClick={handleTabs} className={getClassName('privacy')}>Privacy</span>
                    </div>
                </div>
            </div>

            {tabs.myInfo && (
                <MyInfo userData={userData} setSendReq={setSendReq} sendReq={sendReq}/>
            )}

            {tabs.account && (
                <Account userData={userData} setSendReq={setSendReq} sendReq={sendReq} />
            )}

            {tabs.privacy && (
                <Privacy />
            )}

            <Footer />
        </>
    );
}


export default Settings