import React, { useEffect, useState } from "react";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
axios.defaults.withCredentials = true;


function PersonalInfo({ userData, setSendReq, sendReq }) {

    const [personalData, setPersonalData] = useState({ firstname: '', lastname: '', sex: '', weight: '', ft: '', in: '', dob: null, edit: false });


    useEffect(() => {
        if (userData.firstName && userData.lastName && userData.sex && userData.weightHistory) {
            setPersonalData((currData) => ({
                ...currData,
                firstname: userData.firstName,
                lastname: userData.lastName,
                sex: userData.sex,
                weight: userData.weightHistory[userData.weightHistory.length - 1].weight,
                ft: userData.ft ? userData.ft : '',
                in: userData.in ? userData.in : '',
                dob: userData.dob ? dayjs(userData.dob) : null,
                edit: false
            }));


        }
    }, [userData]);


    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setPersonalData((currData) => {
            return {
                ...currData,
                [changedField]: newValue,
            };
        });
    };

    const handleEdit = () => {
        setPersonalData((currData) => {
            return {
                ...currData,
                edit: !personalData.edit,
            };
        });
    };

    const handleDobChange = (date) => {
        setPersonalData((currData) => ({
            ...currData,
            dob: date,
        }));
    };


    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            if (personalData.edit) {
                if (!personalData.dob) { return alert('dob is required'); }
                const response = await axios.post('/user/update', personalData);
                if (response.data.message === 'successfull') {
                    setSendReq(!sendReq)
                }

                setPersonalData((currData) => {
                    return {
                        ...currData,
                        edit: false,
                    };
                });
            }
        }
        catch {
            alert(e);
        }

    };

    return (

        <div id="personalinfo">

            <form onSubmit={handleUpdate}>
                <div className=" flex flex-col gap-5 mt-8">
                    <div className=" flex flex-row justify-between ">
                        <h4> PERSONAL INFO</h4>
                        <h3 onClick={handleEdit} ><FontAwesomeIcon className=" w-6 h-6" icon={faPenToSquare} /> Edit</h3>
                    </div>
                    <div className='flex gap-5'>

                        <TextField id="firstname" onChange={handleChange} name="firstname" type="text" label="First Name" value={personalData.firstname} disabled={!personalData.edit} required />
                        <TextField id="lastname" onChange={handleChange} name="lastname" type="text" label="Last Name" value={personalData.lastname} disabled={!personalData.edit} required />
                    </div>
                    <div className='flex gap-5'>
                        <FormControl disabled={!personalData.edit} className=" w-36" required>
                            <InputLabel>Sex</InputLabel>
                            <Select label="Sex" name="sex" value={personalData.sex} onChange={handleChange}>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            name="weight"
                            onChange={handleChange}
                            value={personalData.weight}
                            label="Weight"
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                            }}
                            disabled={!personalData.edit}
                            required
                        />

                    </div>
                    <div className=" flex flex-row gap-3">
                        <div className=" flex flex-row border border-black-900 w-6/12">
                            <div className=" w-6/12">
                                <FormControl disabled={!personalData.edit} className="w-full" required>
                                    <InputLabel>ft</InputLabel>
                                    <Select label="ft" name="ft" value={personalData.ft} onChange={handleChange}>
                                        <MenuItem value="3">3 ft</MenuItem>
                                        <MenuItem value="4">4 ft</MenuItem>
                                        <MenuItem value="5">5 ft</MenuItem>
                                        <MenuItem value="6">6 ft</MenuItem>
                                        <MenuItem value="7">7 ft</MenuItem>
                                        <MenuItem value="8">8 ft</MenuItem>
                                    </Select>
                                </FormControl>


                            </div>
                            <span className="border border-r-black-700"></span>
                            <div className=" w-6/12">
                                <FormControl disabled={!personalData.edit} className="w-full" required>
                                    <InputLabel>in</InputLabel>
                                    <Select label="in" name="in" value={personalData.in} onChange={handleChange}>
                                        <MenuItem value="0">0 in</MenuItem>
                                        <MenuItem value="1">1 in</MenuItem>
                                        <MenuItem value="2">2 in</MenuItem>
                                        <MenuItem value="3">3 in</MenuItem>
                                        <MenuItem value="4">4 in</MenuItem>
                                        <MenuItem value="5">5 in</MenuItem>
                                        <MenuItem value="6">6 in</MenuItem>
                                        <MenuItem value="7">7 in</MenuItem>
                                        <MenuItem value="8">8 in</MenuItem>
                                        <MenuItem value="9">9 in</MenuItem>
                                        <MenuItem value="10">10 in</MenuItem>
                                        <MenuItem value="11">11 in</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className=" mt-[3px]">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    name="dob"
                                    label={'Date of Birth'}
                                    disabled={!personalData.edit}
                                    openTo="year"
                                    views={['year']}
                                    value={personalData.dob}
                                    onChange={(newValue) => handleDobChange(newValue)}

                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <Button variant="contained" type="submit">UPDATE</Button>

                </div>
            </form>
        </div>

    );
}

export default PersonalInfo;