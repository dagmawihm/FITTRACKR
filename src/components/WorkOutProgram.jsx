import React, { useState } from "react";
import Progress from "../components/Progress";
import EditWorkOutProgram from "../components/EditWorkOutProgram";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function WorkOutProgram() {

    const [modalContent, setModalContent] = useState({ progressVisible: false, editVisible: false, name: "" });

    const handleWorkoutClick = (exercise) => {
        setModalContent({ progressVisible: true, editVisible: false, name: exercise });
    };

    const handleEditClick = () => {
        setModalContent({ progressVisible: false, editVisible: true, name: "" });
    };

    const closeModal = () => {
        setModalContent({ progressVisible: false, editVisible: false, name: "" });
    };


    return (
        <div id="workoutprogram">
            <div className="px-10 mt-7">
                <div className="flex flex-col gap-3">
                    <h3 className="flex justify-end" onClick={() => handleEditClick("Incline Bench Press")}><FontAwesomeIcon className=" w-6 h-6" icon={faPenToSquare} /> Edit</h3>
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
                    <div className="flex text-lg">TRICEPS</div>
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
                    <div className="flex text-lg">BICEPS</div>
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

            {modalContent.progressVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                    <div className="bg-white rounded-md p-5 max-w-md w-full">
                        <button onClick={closeModal} className="float-right text-2xl border px-2">&times;</button>
                        <Progress />
                    </div>
                </div>
            )}

            {modalContent.editVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                    <div className="flex flex-col bg-white rounded-md p-5 max-w-md w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <div><button onClick={closeModal} className="float-right text-2xl border w-7 px-2">&times;</button></div>
                        <EditWorkOutProgram closeModal={closeModal}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkOutProgram;
