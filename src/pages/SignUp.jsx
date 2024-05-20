import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


function SignUp() {

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", sex:"", weight:"", checked: true });

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



    return (


        <div className=" w-full flex justify-center">
            <div className=" w-11/12 my-2">
                <div><Header /></div>

                <div className="flex flex-col gap-5 justify-center h-[90vh]">
                    <div className="flex flex-col justify-center items-center pb-6">
                        <div className=' bg-purple-800 rounded-full w-12 h-12 text-white flex justify-center items-center'><FontAwesomeIcon icon={faLock} /></div>
                        <h1 className='font-normal text-2xl'>Sign up</h1>
                    </div>

                    <div className='flex gap-5'>
                        <TextField id="firstname" name="firstName" type="text" onChange={handleChange} label="First Name *" value={formData.firstName} />
                        <TextField id="lastname" name="lastName" type="text" onChange={handleChange} label="Last Name *" value={formData.lastName} />
                    </div>

                    <div className='flex gap-5'>
                            <FormControl className=" w-36">
                                <InputLabel>Sex *</InputLabel>
                                <Select label="Sex" name="sex" onChange={handleChange} value={formData.sex}>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Weight *"
                                name="weight"
                                onChange={handleChange}
                                value={formData.weight}
                                type="number"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                                }}
                            />
                        </div>

                    <div className='flex flex-col gap-5'>
                        <TextField id="email" name="email" type="email" onChange={handleChange} label="Email Address *" value={formData.email} />
                        <TextField id="password" name="password" type="password" onChange={handleChange} label="Password *" value={formData.password} />
                        <TextField id="confirmpassword" name="confirmPassword" type="password" onChange={handleChange} label="Confirm Password *" value={formData.confirmPassword} />
                        <FormControlLabel control={<Checkbox checked={formData.checked} />} onChange={handleCheckboxChange} className=' w-96' label="I want to receive inspiration, marketing promotions and updates via email." />
                        <Button variant="contained">SIGN UP</Button>
                    </div>

                    <div className=' flex justify-end text-sm'>
                        <NavLink to={"/login"} className=' underline text-blue-500 cursor-pointer'>Already have an account? Sign in</NavLink>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>

    );
}

export default SignUp;
