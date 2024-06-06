import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { faLock, faG } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios';
axios.defaults.withCredentials = true;

function Login({setUser}) {

    const [formData, setFormData] = useState({ email: "", password: "", checked: false });

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setFormData((currData) => {
            return {
                ...currData,
                [changedField]: newValue,
            };
        });
    };

    const handleCheckboxChange = (e) => {
        const newValue = e.target.checked;
        setFormData((currData) => ({
            ...currData,
            checked: newValue,
        }));
    };


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post('/user/login', formData);
            if (response.data.message === "Logged in Successfully.") {
                setUser(true)
            }
            else {
                alert(response.data.message);
            }
        }
        catch (e) {
            alert(e);
        }
    };


    return (
        <div className=" flex flex-col gap-16 justify-center h-[90vh]">
            <div className=" flex flex-col items-center gap-2">
                <div className=' bg-purple-800 rounded-full w-12 h-12 text-white flex justify-center items-center'><FontAwesomeIcon icon={faLock} /></div>
                <h1 className='font-normal text-2xl'>Login</h1>
            </div>

            <div className=" flex flex-col gap-5">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <TextField className=" w-full" id="email" name="email" type="email" label="Email Address" onChange={handleChange} value={formData.username} required/>
                    <TextField className=" w-full" id="password" name="password" type="password" label="Password" onChange={handleChange} value={formData.password} required/>
                    <FormControlLabel control={<Checkbox checked={formData.checked} />} onChange={handleCheckboxChange} className=' w-96' label="Remember me" />
                    <Button variant="contained" type="submit">LOG IN</Button>
                </form>

                <div className=" flex flex-col gap-4">
                    <p className=" flex justify-center">OR With</p>

                    <div className=" flex border rounded-md">
                        <div className='w-1/12 h-10 flex text-2xl pl-2 justify-center items-center'><FontAwesomeIcon icon={faG} /></div>
                        <span className=" w-11/12 flex justify-center items-center">
                            Signup with&nbsp;
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4335]">e</span></span>
                    </div>

                </div>

                <div className=' flex justify-between'>
                    <NavLink to={"/forgot-password"} className=' underline text-blue-500 cursor-pointer'>Forgot password?</NavLink>
                    <NavLink to={"/signup"} className=' underline text-blue-500 cursor-pointer'>Don't have an account? Sign Up</NavLink>
                </div>
            </div>

            <Footer />
        </div>
    );
}
export default Login;