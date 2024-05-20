import React, { useState } from "react";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



function PersonalInfo() {

    const [personalData, setPersonalData] = useState({ firstname: "JON", lastname: "DOW", sex: "male", weight: "150", edit: true });

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

    return (

        <div id="personalinfo">

        <div className=" flex flex-col gap-5 mt-5">
            <div className=" flex flex-row justify-between ">
                <h4> PERSONAL INFO</h4>
                <h3 onClick={handleEdit} ><FontAwesomeIcon className=" w-6 h-6" icon={faPenToSquare} /> Edit</h3>
            </div>
            <div className='flex gap-5'>
                <TextField id="firstname" onChange={handleChange} name="firstname" type="text" label="First Name" value={personalData.firstname} disabled={personalData.edit} />
                <TextField id="lastname" onChange={handleChange} name="lastname" type="text" label="Last Name" value={personalData.lastname} disabled={personalData.edit} />
            </div>
            <div className='flex gap-5'>
                <FormControl disabled={personalData.edit} className=" w-36">
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
                    disabled={personalData.edit}
                />
            </div>

            <Button variant="contained">UPDATE</Button>
        </div>
    </div>

    );
}

export default PersonalInfo;