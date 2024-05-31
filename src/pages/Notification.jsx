import React from "react";
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "../components/Footer";



function Notification() {
    return (
        <>
            <h1 className=" flex text-2xl my-4">Notification</h1>
            <div className=" flex flex-col gap-3">

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faUser} />
                    <span className=" text-sm">John Doe liked your recent workout progress. Keep it up!</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faBell} />
                    <span className=" text-sm">Congrats! You've completed your daily step goal. Great job!</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faUser} />
                    <span className=" text-sm">Anna Smith commented on your progress: "Amazing transformation!"</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faBell} />
                    <span className=" text-sm">New workout routine available! Check out the latest strength training plan.</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faUser} />
                    <span className=" text-sm">Michael Lee started following you. Connect and share your progress!</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faBell} />
                    <span className=" text-sm">Reminder: Time for your scheduled run. Let's hit the track!</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faUser} />
                    <span className=" text-sm">Sarah Connor sent you a friend request. Start your fitness journey together!</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faBell} />
                    <span className=" text-sm">Weekly summary: You've burned 3,500 calories this week. Awesome work!</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faUser} />
                    <span className=" text-sm">Chris Brown shared a new post: "5 Tips for Staying Motivated".</span>
                </div>

                <div className=" flex flex-row bg-slate-100 rounded-md py-2 px-4 gap-4">
                    <FontAwesomeIcon className=" w-10 h-10 mt-0" icon={faBell} />
                    <span className=" text-sm">New challenge: Join the 30-Day Fitness Challenge and win rewards!</span>
                </div>




                <Footer />
            </div>
        </>

    );
}

export default Notification
