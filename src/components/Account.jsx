import React, { useState } from "react";
import { TextField, Button } from '@mui/material';



function Account() {

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
                        <Button variant="contained">UPDATE</Button>
                    </div>
                )}

                {tabs.email && (
                    <div className="flex flex-col gap-5">
                        <TextField
                            id="currentemail"
                            name="currentEmail"
                            value={"jondow@jon.com"}
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
                            label="Current Password"
                            required
                        />
                        <Button variant="contained">UPDATE</Button>

                    </div>
                )}
            </div>
        </div>

    );
}

export default Account;