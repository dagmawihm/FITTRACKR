import React, { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faPenToSquare, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Button, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
axios.defaults.withCredentials = true;



function PersonalInfo({ userData, setSendReq, sendReq }) {
    Chart.register(...registerables);

    const calculateCalorieNeeds = (sex, weight, dob, ft, inches) => {
        // Convert ft and inches to cm
        const heightInCm = (ft * 30.48) + (inches * 2.54);

        // Convert weight to kg
        const weightInKg = weight * 0.453592;

        // Calculate age
        const currentDate = new Date();
        const birthDate = new Date(dob);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        // Calculate BMR using the Harris-Benedict Equation
        let bmr;
        if (sex === 'male') {
            bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
        } else if (sex === 'female') {
            bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
        } else {
            throw new Error('Invalid sex provided. Must be "male" or "female".');
        }

        // Assume a Lightly active level for now (BMR * 1.375)
        const tdee = bmr * 1.375;

        // Ensure 1 gram of protein per pound of body weight
        const protein = weight; // 1 gram of protein per pound of body weight
        const proteinCalories = protein * 4; // 1 gram of protein = 4 calories

        // Calculate remaining calories after protein
        const remainingCalories = tdee - proteinCalories;

        // Suggested macronutrient ratios for remaining calories
        const carbRatio = 0.50; // 50% of remaining calories
        const fatRatio = 0.50; // 50% of remaining calories

        // Calculate grams of carbs and fat
        const carbs = (remainingCalories * carbRatio) / 4; // 1 gram of carbs = 4 calories
        const fat = (remainingCalories * fatRatio) / 9; // 1 gram of fat = 9 calories

        return {
            tdee: tdee.toFixed(2),
            carbs: carbs.toFixed(2),
            protein: protein.toFixed(2),
            fat: fat.toFixed(2)
        };
    };

    function extractDateAndWeight(weightHistory, year, month = null) {
        let dataByMonth = {};
        let filteredData = [];

        weightHistory.forEach(record => {
            let date = new Date(record.date);
            let recordMonth = date.getUTCMonth() + 1; // Use getUTCMonth to avoid timezone issues
            let recordYear = date.getUTCFullYear(); // Use getUTCFullYear to avoid timezone issues

            if (recordYear === year) {
                if (month === null || recordMonth === month) {
                    if (month !== null) {
                        filteredData.push(record);
                    } else {
                        if (!dataByMonth[recordMonth]) {
                            dataByMonth[recordMonth] = [];
                        }
                        dataByMonth[recordMonth].push(record.weight);
                    }
                }
            }
        });

        if (month !== null) {
            let xAxisData = filteredData.map(record => String(new Date(record.date).getUTCDate()).padStart(2, '0')); // Use getUTCDate
            let yAxisData = filteredData.map(record => record.weight);
            return { xAxisData, yAxisData };
        } else {
            let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let xAxisData = Object.keys(dataByMonth).map(month => monthNames[month - 1]);
            let yAxisData = [];
            Object.values(dataByMonth).forEach(monthWeights => {
                let averageWeight = monthWeights.reduce((acc, val) => acc + val, 0) / monthWeights.length;
                yAxisData.push(averageWeight);
            });
            return { xAxisData, yAxisData };
        }
    }

    const [chartData, setChartData] = useState({ yAxisData: [], xAxisData: [] })
    const [personalData, setPersonalData] = useState({ firstname: '', lastname: '', sex: '', weight: '', ft: '', in: '', dob: null, edit: false });
    const [datePickerDiv, setDatePickerDiv] = useState({ div: false, month: false, year: false });
    const [pickedDate, setPickedDate] = useState({ month: dayjs(), year: dayjs() });


    const handlePickerChange = (date, name) => {
        setPickedDate((currData) => ({
            ...currData,
            [name]: date,
        }));
    };


    const handleDobChange = (date) => {
        setPersonalData((currData) => ({
            ...currData,
            dob: date,
        }));
    };


    const handleDate = (name) => {
        setDatePickerDiv((currData) => ({
            ...currData,
            year: name === 'year' ? !currData.year : false,
            month: name === 'month' ? !currData.month : false,
            div: true,
        }));
    };

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

            const { xAxisData, yAxisData } = extractDateAndWeight(userData.weightHistory, pickedDate.year.$y);
            setChartData({ xAxisData, yAxisData });
        }
    }, [datePickerDiv.year, userData, pickedDate.year.$y]);

    useEffect(() => {
        if (userData.weightHistory) {
            const { xAxisData, yAxisData } = extractDateAndWeight(userData.weightHistory, pickedDate.month.$y, pickedDate.month.$M + 1);
            setChartData({ xAxisData, yAxisData });
        }
    }, [userData, pickedDate.month.$y, pickedDate.month.$M, datePickerDiv.month]);
    let calorieNeeds = null
    if (userData.ft && userData.in && userData.sex && userData.weightHistory && userData.dob) {
        calorieNeeds = calculateCalorieNeeds(userData.sex, userData.weightHistory[userData.weightHistory.length - 1].weight, userData.dob, userData.ft, userData.in);
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

    const chartDataSets = {
        labels: chartData.xAxisData,
        datasets: [
            {
                data: chartData.yAxisData,
                fill: true,
                backgroundColor: 'rgba(55,65,81,1)',
                borderColor: 'rgba(55,65,81,1)',
                tension: 0.3,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderColor: 'rgba(0,0,0,1)',
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (

        <div id="personalinfo">
            <div className=" mt-7">
                <div className=" flex flex-row justify-between ">
                    <h3 className="text-lg">PROGRESS</h3>
                </div>

                <div className="flex justify-center mt-4">
                    <div className=" w-96 h-64 flex flex-col">
                        <div className=" flex justify-center gap-12">
                            <div onClick={() => { handleDate("month") }}><span className=" bg-slate-400 px-6 rounded-md">M</span> <span className=" text-xl"><FontAwesomeIcon icon={faCalendarDays} /></span></div>
                            <div onClick={() => { handleDate("year") }}><span className=" bg-slate-400 px-6 rounded-md">Y</span> <span className=" text-xl"><FontAwesomeIcon icon={faCalendarDays} /></span></div>
                        </div>
                        {datePickerDiv.div && (<div className=" flex justify-center gap-12 mt-2">
                            {datePickerDiv.month && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label={'Month'}
                                        openTo="month"
                                        views={['year', 'month']}
                                        sx={{ width: '190px' }}
                                        value={pickedDate.month}
                                        onChange={(newValue) => handlePickerChange(newValue, 'month')}
                                    />
                                </LocalizationProvider>
                            )}
                            {datePickerDiv.year && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label={'Year'}
                                        openTo="year"
                                        views={['year']}
                                        sx={{ width: '110px' }}
                                        value={pickedDate.year}
                                        onChange={(newValue) => handlePickerChange(newValue, 'year')}
                                    />
                                </LocalizationProvider>
                            )}
                        </div>)}

                        <Line className="" data={chartDataSets} options={chartOptions} />
                    </div>
                </div>
            </div>

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
            {calorieNeeds && (
                <div className=" mt-8">
                    <div className=" flex flex-col gap-1">
                        <h3>Daily Calories</h3>
                        <h4 className=" font-bold"> {calorieNeeds.tdee} cal</h4>
                        <h5 className=" font-thin text-gray-400">Carbs {calorieNeeds.carbs}g / Fat {calorieNeeds.fat}g / Protein {calorieNeeds.protein}g</h5>
                    </div>
                </div>
            )}

        </div>

    );
}

export default PersonalInfo;