import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import WorkOutLog from "../components/WorkOutLog";
import { faCircleCheck, faCalendarDays, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Home({ setUser }) {

    const [userData, setUserData] = useState({});
    const [exercises, setExercises] = useState({});
    const [dayName, setDayName] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('/user/profile');
                if (response.data.message === 'successfull') {
                    setUserData(response.data.user);

                }
            }
            catch (e) {
                if (e.response && e.response.status === 401) {
                    setUser(false);
                }
            }

        }
        getProfile();
    }, [setUser]);



    useEffect(() => {
        const pushMuscleGroups = ["chest", "shoulders", "triceps"];
        const pullMuscleGroups = ["back", "biceps", "forearm", "core"];
        const legMuscleGroups = ["quadriceps", "hamstrings", "glutes", "calves"];
        
        const getExercisesForVisit = (user) => {
            if (user.exercises) {
                let muscleGroups = [];
                
                // Decrement visitCount if visitCountModifiedDate is today
                const currentDate = new Date();
                const todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Get today's date with time set to 00:00:00
                if (user.visitCountModifiedDate < todayDate) {
                    user.visitCount--;
                }

                switch ((user.visitCount - 1) % 3) { // Subtracting 1 from visitCount for today's adjustment
                    case 0:
                        muscleGroups = pushMuscleGroups;
                        break;
                    case 1:
                        muscleGroups = pullMuscleGroups;
                        break;
                    case 2:
                        muscleGroups = legMuscleGroups;
                        break;
                    default:
                        muscleGroups = pushMuscleGroups; // Default case, should not be reached
                        break;
                }

                const exercises = user.exercises.filter(exercise => muscleGroups.includes(exercise.muscleGroup));

                return exercises;
            }
        };

        setExercises(getExercisesForVisit(userData));
    }, [userData]);

    useEffect(() => {
        const currentDate = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[currentDate.getDay()];
        setDayName(dayName);
    }, []);

    const visitCountDisplay = userData.visitCount < 3 ? 3 : userData.visitCount;
    const weekDisplay = (visitCountDisplay / 3).toFixed(0);
    const displayVisitCount= userData.visitCount < 1 ? 1 : userData.visitCount;

    return (
        <>
            <div className=" flex flex-row py-5">
                <div className=" w-10/12"><p>WEEk {weekDisplay} DAY {displayVisitCount} {dayName}</p></div>


                <div className=" flex gap-4 pt-1 text-lg">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>

            </div>
            <div className="mb-3 flex gap-4">
                {Array.isArray(exercises) && exercises.map((group, index) => (
                    <span className=" border border-green-400 uppercase py-1 px-3" key={index}>
                        {group.muscleGroup}
                    </span>
                ))}
            </div>
            <hr className=" w-full absolute left-0 border-gray-300" />
            {Array.isArray(exercises) && exercises.map((group, index) => (
                <div key={index}>
                    {group.workouts.map((exercise, exerciseIndex) => (
                        exercise.isActive && (
                            <WorkOutLog
                                key={exerciseIndex}
                                muscleGroup={group.muscleGroup}
                                exerciseName={exercise.exerciseName}
                            />
                        )
                    ))}
                </div>
            ))}
            <Footer />
        </>
    );

}
export default Home;