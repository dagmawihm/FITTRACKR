import React, { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



function PersonalInfo() {
    const [chartData, setChartData] = useState({ yAxisData: [], xAxisData: [] })
    const [personalData, setPersonalData] = useState({ firstname: "JON", lastname: "DOW", sex: "male", weight: "150", edit: true });

    useEffect(() => {
        setChartData((currData) => {
            return {
                ...currData,
                xAxisData: [1, 2, 3, 4, 5],
                yAxisData: getRandomNumbers(5, 100, 200),
            };
        });
    }, []);

    function getRandomNumbers(count, min, max) {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }


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
        <div className=" px-10 mt-7">

            <div className=" flex flex-row justify-between ">
                <h3 className="text-lg">PROGRESS</h3>
            </div>

            <div className="flex justify-center my-4">
                <div className=" w-full h-64 flex flex-row">
                    {chartData &&

                        <LineChart className="w-full h-full"
                            xAxis={[
                                {
                                    label: "Date",
                                    data: chartData.xAxisData
                                },
                            ]}
                            yAxis={[{ label: "lbs" }]}
                            series={[
                                {
                                    data: chartData.yAxisData,
                                    area: true,
                                    color: 'rgba(55, 65, 81, 0.8)',
                                },
                            ]}
                        />}
                </div>
            </div>

        </div>


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

        <div className=" mt-8">
            <div className=" flex flex-col gap-1">
                <h3>Daily Calories</h3>
                <h4 className=" font-bold">1,580 cal</h4>
                <h5 className=" font-thin text-gray-400">Carbs 198g / Fat 53g / Protein 80g</h5>
            </div>
        </div>

    </div>

    );
}

export default PersonalInfo;