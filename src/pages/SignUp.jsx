import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";
import Header from "../components/Header";


function SignUp() {

    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", checked: true });

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

    // const handleSubmit = () => {

    //     console.log(formData.firstName, formData.lastName)
    // }; 

    return (
        // <div>
        //     <Header />
        //     <div className="flex justify-center items-center h-screen">
        //         <div className='flex flex-col gap-5 w-min'>
        //             <div className="flex flex-col justify-center items-center pb-6">
        //                 <div className=' bg-purple-800 rounded-full w-12 h-12 text-white flex justify-center items-center'><FontAwesomeIcon icon={faLock} /></div>
        //                 <h1 className='font-normal text-2xl'>Sign up</h1>
        //             </div>
        //             <div className='flex gap-5'>
        //                 <TextField id="firstname" name="firstName" type="text" onChange={handleChange} label="First Name *" value={formData.firstName} />
        //                 <TextField id="lastname" name="lastName" type="text" onChange={handleChange} label="Last Name *" value={formData.lastName} />
        //             </div>
        //             <div className='flex flex-col gap-5'>
        //                 <TextField id="email" name="email" type="email" onChange={handleChange} label="Email Address *" value={formData.email} />
        //                 <TextField id="password" name="password" type="password" onChange={handleChange} label="Password *" value={formData.password} />
        //                 <TextField id="confirmpassword" name="confirmPassword" type="password" onChange={handleChange} label="Confirm Password *" value={formData.confirmPassword} />
        //                 <FormControlLabel control={<Checkbox checked={formData.checked} />} onChange={handleCheckboxChange} className=' w-96' label="I want to receive inspiration, marketing promotions and updates via email." />
        //                 <Button variant="contained">SIGN UP</Button>
        //             </div>
        //             <div className=' flex justify-end text-sm'>
        //                 <NavLink to={"/login"} className=' underline text-blue-500 cursor-pointer'>Already have an account? Sign in</NavLink>
        //             </div>

        //             <div className="flex justify-center pt-12 text-slate-400">
        //                 <p>Copyright © Your Website 2024.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>

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

                    <div className="flex justify-center pt-12 text-slate-400">
                        <p>Copyright © Your Website 2024.</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignUp;
