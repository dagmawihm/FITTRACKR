import React, { useState } from "react";
import { Button } from '@mui/material';

function EditWorkOutProgram({ closeModal }) {
    const [selections, setSelections] = useState({
        chest: ['', '', ''],
        triceps: ['', '', ''],
        shoulders: ['', '', ''],
        back: ['', '', ''],
        biceps: ['', '', ''],
        forearm: ['', '', ''],
        core: ['', '', ''],
        quadriceps: ['', '', ''],
        hamstrings: ['', '', ''],
        glutes: ['', '', ''],
        calves: ['', '', ''],
    });

    const handleSelectChange = (muscleGroup, index, event) => {
        setSelections((prevSelections) => ({
            ...prevSelections,
            [muscleGroup]: prevSelections[muscleGroup].map((item, idx) =>
                idx === index ? event.target.value : item
            ),
        }));
    };

    const renderSelects = (muscleGroup, options) => {
        return selections[muscleGroup].map((value, index) => (
            <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" key={index}>
                <select
                    value={value}
                    onChange={(event) => handleSelectChange(muscleGroup, index, event)}
                    className="w-full bg-transparent outline-none"
                >
                    <option value=""></option>
                    {options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        ));
    };

    const handleSubmit = () => {
        console.log(selections);
        closeModal();
    };


    return (
        <div className="flex flex-col gap-3">
            <div className="flex text-lg">CHEST</div>
            {renderSelects('chest', ['Flat Bench Press', 'Incline Bench Press', 'Butterfly Machine'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">TRICEPS</div>
            {renderSelects('triceps', ['Overhead Extension', 'Cable Pushdowns', 'Close grip pressing', 'Dips'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">SHOULDERS</div>
            {renderSelects('shoulders', ['Lateral Raises', 'Face Pull', 'Overhead Press', 'Upright rows'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">BACK</div>
            {renderSelects('back', ['Lat Pulldowns', 'Row', 'Pull-ups', 'Deadlifts'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">BICEPS</div>
            {renderSelects('biceps', ['Incline Dumbbell Curls', 'Behind the body cable curls', 'Preacher Curl'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">FOREARM</div>
            {renderSelects('forearm', ['Wrist Curls', 'Reverse Wrist Curls', "Farmer's Walk"])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">CORE</div>
            {renderSelects('core', ['Plank', 'Hanging Leg Raises', 'Russian Twists'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">QUADRICEPS</div>
            {renderSelects('quadriceps', ['Hack Squats', 'Leg Extension', 'Barbell squats', 'Leg presses'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">HAMSTRINGS</div>
            {renderSelects('hamstrings', ['Seated Leg Curl', 'Lying leg curls', 'Stiff legged deadlift'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">GLUTES</div>
            {renderSelects('glutes', ['Front foot elevated lunges', 'Hip thrust', 'Seated Hip Adduction (outer thigh)'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <div className="flex text-lg">CALVES</div>
            {renderSelects('calves', ['Straight leg calf exercises', 'Seated Calf Raises', 'Calf Press'])}
            <hr className="w-full mt-1 left-0 border-gray-300" />

            <Button onClick={handleSubmit} variant="contained">UPDATE</Button>
        </div>
    );
};

export default EditWorkOutProgram;
