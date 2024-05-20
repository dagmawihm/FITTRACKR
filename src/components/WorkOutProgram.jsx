import React, { useState } from "react";
import { LineChart } from '@mui/x-charts';



function WorkOutProgram() {
    const [modalContent, setModalContent] = useState({ visible: false, name: "" });

    const handleWorkoutClick = (exercise) => {
        setModalContent({ visible: true, name: exercise });
    };

    const closeModal = () => {
        setModalContent({ visible: false, name: "" });
    };


    function getRandomNumbers(count, min, max) {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const xAxisData = [1, 2, 3, 4, 5];
    const yAxisData = getRandomNumbers(5, 100, 200);

    return (
        <div id="workoutprogram">
            <div className="px-10 mt-7">
                <div className="flex flex-col gap-3">
                    <div className="flex text-lg">CHEST</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Flat Bench Press")}>
                        <span>Flat Bench Press</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Incline Bench Press")}>
                        <span>Incline Bench Press</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">TRICEP</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Cable Extension")}>
                        <span>Cable Extension</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Overhead Extension")}>
                        <span>Overhead Extension</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">SHOULDERS</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Lateral Raises")}>
                        <span>Lateral Raises</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Face Pull")}>
                        <span>Face Pull</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">BACK</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Lat Pulldowns")}>
                        <span>Lat Pulldowns</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Row")}>
                        <span>Row</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">BICEP</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Incline Curls")}>
                        <span>Incline Curls</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Preacher Curl")}>
                        <span>Preacher Curl</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">QUADRICEPS</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Hack Squats")}>
                        <span>Hack Squats</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Leg Extension")}>
                        <span>Leg Extension</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">HAMSTRINGS</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Seated Leg Curl")}>
                        <span>Seated Leg Curl</span>
                        <span>150 lbs</span>
                    </div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Deadlifts")}>
                        <span>Deadlifts</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                    <div className="flex text-lg">CALVES</div>
                    <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Standing Calf Raises")}>
                        <span>Standing Calf Raises</span>
                        <span>150 lbs</span>
                    </div>
                    <hr className="w-full mt-1 left-0 border-gray-300" />
                </div>
            </div>

            {modalContent.visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="bg-white rounded-md p-5 max-w-md w-full">
                        <button onClick={closeModal} className="float-right text-2xl border px-2">&times;</button>
                        <h2 className="text-lg font-bold mb-4">{modalContent.name}</h2>

                        <LineChart className="w-full h-full"
                            xAxis={[
                                {
                                    label: "Date",
                                    data: xAxisData
                                },
                            ]}
                            yAxis={[{ label: "lbs" }]}
                            series={[
                                {
                                    data: yAxisData,
                                    area: true,
                                    color: 'rgba(55, 65, 81, 0.8)',
                                },
                            ]}
                            height={400}
                        />
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Leg Extension")}>
                                <span>05/19/2024</span>
                                <span>150 lbs</span>
                                <span>12 REPS</span>
                            </div>
                            <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Leg Extension")}>
                                <span>05/19/2024</span>
                                <span>150 lbs</span>
                                <span>12 REPS</span>
                            </div>
                            <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Leg Extension")}>
                                <span>05/19/2024</span>
                                <span>150 lbs</span>
                                <span>12 REPS</span>
                            </div>
                            <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer" onClick={() => handleWorkoutClick("Leg Extension")}>
                                <span>05/19/2024</span>
                                <span>150 lbs</span>
                                <span>12 REPS</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkOutProgram;
