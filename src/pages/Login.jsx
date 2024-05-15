import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

function Login() {

    const [formData, setFormData] = useState({ email: "", password: "", checked: false });

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData((currData) => {
            return {
                ...currData,
                [changedField]: newValue,
            };
        });
    };

    const handleCheckboxChange = (event) => {
        const newValue = event.target.checked;
        setFormData((currData) => ({
            ...currData,
            checked: newValue,
        }));
    };


    return (
        <div className=" flex justify-center w-full">
            <div className=" w-11/12 my-2">
                <Header />
                <div className=" flex flex-col gap-16 justify-center h-[90vh]">
                    <div className=" flex flex-col items-center gap-2">
                        <div className=' bg-purple-800 rounded-full w-12 h-12 text-white flex justify-center items-center'><FontAwesomeIcon icon={faLock} /></div>
                        <h1 className='font-normal text-2xl'>Login</h1>
                    </div>

                    <div className=" flex flex-col gap-5">
                        <TextField className=" w-full" id="email" name="email" type="email" label="Email Address *" onChange={handleChange} value={formData.email} />
                        <TextField className=" w-full" id="password" name="password" type="password" label="Password *" onChange={handleChange} value={formData.password} />
                        <FormControlLabel control={<Checkbox checked={formData.checked} />} onChange={handleCheckboxChange} className=' w-96' label="Remember me" />
                        <Button variant="contained">LOG IN</Button>

                        <div className=' flex justify-between'>
                            <NavLink to={"/forgot-password"} className=' underline text-blue-500 cursor-pointer'>Forgot password?</NavLink>
                            <NavLink to={"/signup"} className=' underline text-blue-500 cursor-pointer'>Don't have an account? Sign Up</NavLink>
                        </div>
                    </div>

                    <div className=" flex justify-center text-gray-400">
                        <p>Copyright © Your Website 2024.</p>
                    </div>
                </div>


            </div>
        </div>
    );
}
export default Login;