import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import axios from 'axios';
axios.defaults.withCredentials = true;

function EditWorkOutProgram({ closeModal, exercises }) {
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

    const [allExercises, setAllExercises] = useState({});

    const initializeSelections = (data) => {
        const selections = {};
        data.forEach((muscleGroup) => {
            const activeWorkouts = muscleGroup.workouts.filter(workout => workout.isActive);
            const exercises = activeWorkouts.map(workout => workout.exerciseName);
            // Ensure each array has 3 elements, filling with empty strings if necessary
            while (exercises.length < 3) {
                exercises.push('');
            }
            selections[muscleGroup.muscleGroup] = exercises.slice(0, 3); // Ensure only 3 exercises are taken
        });
        return selections;
    };

    useEffect(() => {
        const initializedSelections = initializeSelections(exercises);
        setSelections(initializedSelections);
        
        const getExercises = async () => {
            try {
                const response = await axios.get('/exercise/exercises');
                if (response.data.message === 'successfull') {
                    // Transform the data to an object where keys are muscle groups
                    const exerciseData = response.data.exercises.reduce((acc, group) => {
                        acc[group.muscleGroup] = group.exercises;
                        return acc;
                    }, {});
                    setAllExercises(exerciseData);
                }
            }
            catch (e) {
                alert(e);
            }
        }
        getExercises();
    }, [exercises]);
    

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
                    <option value="">None</option>
                    {options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        ));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/user/update/exercises', selections);
            if (response.data.message === "successfull") {
               // alert('successfull');
                closeModal();
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
        <div className="flex flex-col gap-3">
            <div className="flex text-lg">CHEST</div>
            {renderSelects('chest', allExercises['chest'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">TRICEPS</div>
            {renderSelects('triceps', allExercises['triceps'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">SHOULDERS</div>
            {renderSelects('shoulders', allExercises['shoulders'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">BACK</div>
            {renderSelects('back', allExercises['back'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">BICEPS</div>
            {renderSelects('biceps', allExercises['biceps'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">FOREARM</div>
            {renderSelects('forearm', allExercises['forearm'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">CORE</div>
            {renderSelects('core', allExercises['core'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">QUADRICEPS</div>
            {renderSelects('quadriceps', allExercises['quadriceps'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">HAMSTRINGS</div>
            {renderSelects('hamstrings', allExercises['hamstrings'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">GLUTES</div>
            {renderSelects('glutes', allExercises['glutes'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <div className="flex text-lg">CALVES</div>
            {renderSelects('calves', allExercises['calves'] || [])}
            <hr className="w-full mt-1 left-0 border-gray-300" />
    
            <Button onClick={handleSubmit} variant="contained">UPDATE</Button>
        </div>
    );
    
};

export default EditWorkOutProgram;
