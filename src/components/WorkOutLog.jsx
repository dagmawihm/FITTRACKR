import React, { useState } from "react";
import { faCircleCheck, faEllipsisVertical, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, InputAdornment } from '@mui/material';
function WorkOutLog() {

    const [logData, setLogData] = useState({ weight1: "", reps1: "", log1: false, weight2: "", reps2: "", log2: false, weight3: "", reps3: "", log3: false });
    const allLogsDone = logData.log1 && logData.log2 && logData.log3;
    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setLogData((currData) => {
            return {
                ...currData,
                [changedField]: newValue,
            };
        });
    };

    const handleCheckboxChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.checked;
        setLogData((currData) => ({
            ...currData,
            [changedField]: newValue,
        }));
    };

    return (
        <div>
            <div className=" flex flex-row justify-between mt-4">
                <div className=" border p-1">
                    CHEST  <FontAwesomeIcon className={allLogsDone ? "text-green-600" : ""} icon={faCircleCheck} />
                </div>
                <div className="">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
            </div>

            <div className=" my-2">
                <p>Machine Chest Press <span className=" text-xs text-zinc-400">(suggested wegiht 160)</span></p>
            </div>

            <div className="flex justify-center">

                <div className="flex flex-col w-10/12 gap-4">

                    <div className="grid grid-cols-3 gap-4">
                        <div className=" flex justify-center">WEIGHT</div>
                        <div className=" flex justify-center">REPS</div>
                        <div className=" flex justify-center">LOG</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <TextField
                            className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md"
                            value={logData.weight1}

                            name="weight1"
                            onChange={handleChange}
                            sx={{
                                '&amp; .MuiInputBase-root': {
                                    height: 33,
                                },
                                '&amp; .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                },
                            }}
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                            }}
                            disabled={logData.log1}

                        />
                        <TextField
                            className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md"
                            value={logData.reps1}
                            name="reps1"
                            onChange={handleChange}
                            sx={{
                                '&amp; .MuiInputBase-root': {
                                    height: 33,
                                },
                                '&amp; .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                },
                            }}
                            type="number"
                            disabled={logData.log1}
                        />
                        <div className=" flex justify-center"> <input className="h-6 w-6 accent-green-600" onChange={handleCheckboxChange} checked={logData.log1} name="log1" type="checkbox" /></div>

                    </div>
                    <hr className=" w-full left-0 border-gray-300" />

                    <div className="grid grid-cols-3 gap-4">
                        <TextField
                            className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md"
                            value={logData.weight2}
                            name="weight2"
                            onChange={handleChange}
                            sx={{
                                '&amp; .MuiInputBase-root': {
                                    height: 33,
                                },
                                '&amp; .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                },
                            }}
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                            }}
                            disabled={logData.log2}
                        />
                        <TextField
                            className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md"
                            value={logData.reps2}
                            name="reps2"
                            onChange={handleChange}
                            sx={{
                                '&amp; .MuiInputBase-root': {
                                    height: 33,
                                },
                                '&amp; .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                },
                            }}
                            type="number"
                            disabled={logData.log2}
                        />
                        <div className=" flex justify-center"> <input className="h-6 w-6 accent-green-600" onChange={handleCheckboxChange} checked={logData.log2} name="log2" type="checkbox" /></div>
                    </div>
                    <hr className=" w-full left-0 border-gray-300" />

                    <div className="grid grid-cols-3 gap-4">
                        <TextField
                            className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md"
                            value={logData.weight3}
                            name="weight3"
                            onChange={handleChange}
                            sx={{
                                '&amp; .MuiInputBase-root': {
                                    height: 33,
                                },
                                '&amp; .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                },
                            }}
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                            }}
                            disabled={logData.log3}
                        />
                        <TextField
                            className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md"
                            value={logData.reps3}
                            name="reps3"
                            onChange={handleChange}
                            sx={{
                                '&amp; .MuiInputBase-root': {
                                    height: 33,
                                },
                                '&amp; .MuiSelect-select': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                },
                            }}
                            type="number"
                            disabled={logData.log3}
                        />
                        <div className=" flex justify-center"> <input className="h-6 w-6 accent-green-600" onChange={handleCheckboxChange} checked={logData.log3} name="log3" type="checkbox" /></div>
                    </div>
                    <hr className=" w-full left-0 border-gray-300" />

                </div>

            </div>
        </div>
    );
}

export default WorkOutLog;
