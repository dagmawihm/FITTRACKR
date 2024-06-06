import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import axios from 'axios';
axios.defaults.withCredentials = true;



function Account({ userData, setSendReq, sendReq }) {

    const [accountData, setAccountlData] = useState({ currentPassword: "", newEmail: "", confirmNewEmail: "", newPassword: "", confirmNewPassword: "" });
    const [tabs, setTabs] = useState({ password: true, email: false });

    const handleTabs = (e) => {
        const clickedTab = e.currentTarget.getAttribute('name');
        setTabs({
            password: clickedTab === 'password',
            email: clickedTab === 'email',
        });
    };

    const getClassName = (tabName) => {
        return tabs[tabName] ? 'p-2 border rounded-lg shadow-xl bg-slate-300' : 'p-2 border rounded-lg';
    };

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setAccountlData((currData) => {
            return {
                ...currData,
                [changedField]: newValue,
            };
        });
    };


    const handlePwSubmit = async (e, form) => {
        try {
            e.preventDefault()
            if (accountData.newPassword === accountData.confirmNewPassword) {
                const { currentPassword, newPassword } = accountData;
                const newAccountData = { currentPassword, newPassword };
                const response = await axios.post('/user/update/credentials', newAccountData);
                if (response.data.message === "successfull") {
                    alert('Password updated successfully. Please log in again with your new password.');
                    setSendReq(!sendReq);
                }
                else {
                    alert(response.data.message);
                }
            }
            else {
                alert('Password missmatch');
            }


        }
        catch (e) {
            alert(e);
        }
    };

    const handleEmailSubmit = async (e, form) => {
        try {
            e.preventDefault()
            if (accountData.newEmail === accountData.confirmNewEmail) {
                const { currentPassword, newEmail } = accountData;
                const newAccountData = { currentPassword, newEmail };
                const response = await axios.post('/user/update/credentials', newAccountData);
                if (response.data.message === "successfull") {
                    alert('Email updated successfully.');
                    setSendReq(!sendReq);
                }
                else {
                    alert(response.data.message);
                }
            }
            else {
                alert('Email missmatch');
            }
        }
        catch (e) {
            alert(e);
        }
    };

    return (

        <div>
            <div className="flex flex-col gap-5 mt-5">
                <h2 className=" flex justify-center text-xl">Account Settings</h2>
                <div className=" flex justify-around">
                    <span className={getClassName('password')} name="password" onClick={handleTabs}>Update Password</span>
                    <span className={getClassName('email')} name="email" onClick={handleTabs}>Update Email</span>
                </div>

                {tabs.password && (
                    <div className="flex flex-col gap-5">
                        <form className="flex flex-col gap-5" onSubmit={handlePwSubmit}>
                            <TextField
                                id="currentPassword2"
                                name="currentPassword"
                                value={accountData.currentPassword}
                                type="password"
                                onChange={handleChange}
                                label="Current Password"
                                required
                            />
                            <TextField
                                id="newPassword"
                                name="newPassword"
                                value={accountData.newPassword}
                                type="password"
                                onChange={handleChange}
                                label="New Password"
                                required
                            />
                            <TextField
                                id="confirmPassword"
                                name="confirmNewPassword"
                                value={accountData.confirmNewPassword}
                                type="password"
                                onChange={handleChange}
                                label="Confirm New Password"
                                required
                            />
                            <Button type="submit" variant="contained">UPDATE</Button>
                        </form>
                    </div>
                )}

                {tabs.email && (
                    <div className="flex flex-col gap-5">
                        <form className="flex flex-col gap-5" onSubmit={handleEmailSubmit}>
                            <TextField
                                id="currentemail"
                                name="currentEmail"
                                value={userData.email}
                                type="email"
                                label="Current Email"
                                disabled
                            />
                            <TextField
                                id="email"
                                name="newEmail"
                                value={accountData.newEmail}
                                type="email"
                                onChange={handleChange}
                                label="New Email Address"
                                required
                            />
                            <TextField
                                id="confirmEmail"
                                name="confirmNewEmail"
                                value={accountData.confirmNewEmail}
                                type="email"
                                onChange={handleChange}
                                label="Confirm New Email Address"
                                required
                            />
                            <TextField
                                id="currentPassword1"
                                name="currentPassword"
                                value={accountData.currentPassword}
                                type="password"
                                onChange={handleChange}
                                label="Password"
                                required
                            />
                            <Button type="submit" variant="contained">UPDATE</Button>
                        </form>
                    </div>
                )}
            </div>
        </div >

    );
}

export default Account;