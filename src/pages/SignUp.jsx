import React, { useState } from "react";
import { TextField, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { faLock, faG } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios';



function SignUp({ setUser }) {

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", sex: "", weight: "" });

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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (formData.password === formData.confirmPassword) {
                const response = await axios.post('/user/register', formData);
                if (response.data.message === "User registered successfully") {
                    setUser(true);
                }

            } else {
                alert('Password missmatch');
            }
        }
        catch (e) {
            alert(e);
        }

    };

    return (



        <div className="flex flex-col gap-5 justify-center h-[90vh]">
            <div className="flex flex-col justify-center items-center pb-6">
                <div className=' bg-purple-800 rounded-full w-12 h-12 text-white flex justify-center items-center'><FontAwesomeIcon icon={faLock} /></div>
                <h1 className='font-normal text-2xl'>Sign up</h1>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className='flex gap-5'>
                    <TextField id="firstname" name="firstName" type="text" onChange={handleChange} label="First Name" value={formData.firstName} required />
                    <TextField id="lastname" name="lastName" type="text" onChange={handleChange} label="Last Name" value={formData.lastName} required />
                </div>

                <div className='flex gap-5'>
                    <FormControl className=" w-36" required>
                        <InputLabel>Sex</InputLabel>
                        <Select label="Sex" name="sex" onChange={handleChange} value={formData.sex}>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Weight"
                        name="weight"
                        onChange={handleChange}
                        value={formData.weight}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                        }}
                        required
                    />
                </div>

                <div className='flex flex-col gap-5'>
                    <TextField id="email" name="email" type="email" onChange={handleChange} label="Email Address" value={formData.email} required />
                    <TextField id="password" name="password" type="password" onChange={handleChange} label="Password" value={formData.password} required />
                    <TextField id="confirmpassword" name="confirmPassword" type="password" onChange={handleChange} label="Confirm Password" value={formData.confirmPassword} required />
                    <Button variant="contained" type="submit">SIGN UP</Button>
                </div>
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

            <div className=' flex justify-end text-sm'>
                <NavLink to={"/login"} className=' underline text-blue-500 cursor-pointer'>Already have an account? Sign in</NavLink>
            </div>

            <Footer />
        </div>

    );
}

export default SignUp;
