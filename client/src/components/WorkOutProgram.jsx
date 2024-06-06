import React, { useState } from "react";
import Progress from "../components/Progress";
import EditWorkOutProgram from "../components/EditWorkOutProgram";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkOutProgram({ exercises, setSendReq, sendReq }) {
    const [modalContent, setModalContent] = useState({ progressVisible: false, editVisible: false, name: "", setsHistory: [] });

    const handleWorkoutClick = (exercise, setsHistory) => {
        setModalContent({ progressVisible: true, editVisible: false, name: exercise, setsHistory: setsHistory });
    };

    const handleEditClick = () => {
        setModalContent({ progressVisible: false, editVisible: true, name: "" });
    };

    const closeModal = () => {
        setSendReq(!sendReq)
        setModalContent({ progressVisible: false, editVisible: false, name: "" });
    };
    return (
        <div id="workoutprogram">


            <div className="px-10 mt-7">
                <div className="flex flex-col gap-3">
                    <h3 className="flex justify-end" onClick={handleEditClick}>
                        <FontAwesomeIcon className="w-6 h-6" icon={faPenToSquare} /> Edit
                    </h3>
                    {exercises.map((exerciseGroup) => (
                        <div key={exerciseGroup._id}>
                            <div className="flex text-lg">{exerciseGroup.muscleGroup.toUpperCase()}</div>
                            {exerciseGroup.workouts.map((workout) => (
                                (workout.isActive || workout.setsHistory.length) ? (
                                    <div
                                        key={workout._id}
                                        onClick={() => handleWorkoutClick(workout.exerciseName, workout.setsHistory)}>

                                        <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer my-2">
                                            <span className={workout.isActive ? 'text-green-500' : 'text-red-500'}>
                                                {workout.exerciseName}
                                            </span>
                                            <span className={workout.isActive ? 'text-green-500' : 'text-red-500'}>
                                                {workout.setsHistory.length ? workout.setsHistory[workout.setsHistory.length - 1].weight : ''}
                                            </span>
                                        </div>

                                    </div>
                                ) : null
                            ))}
                            <hr className="w-full mt-1 left-0 border-gray-300" />
                        </div>
                    ))}
                </div>
            </div>



            {modalContent.progressVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                    <div className="bg-white rounded-md p-5 max-w-md w-full">
                        <button onClick={closeModal} className="float-right text-2xl border px-2">&times;</button>
                        <Progress exerciseName={modalContent.name} setsHistory={modalContent.setsHistory} />
                    </div>
                </div>
            )}

            {modalContent.editVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                    <div className="flex flex-col bg-white rounded-md p-5 max-w-md w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <div>
                            <button onClick={closeModal} className="float-right text-2xl border w-7 px-2">&times;</button>
                        </div>
                        <EditWorkOutProgram exercises={exercises} closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkOutProgram;
