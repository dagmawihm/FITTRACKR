import React from "react";
import Footer from "../components/Footer";
import WorkOutLog from "../components/WorkOutLog";
import { faCircleCheck, faCalendarDays, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home() {
    return (
        <>
            <div className=" flex flex-row py-5">
                <div className=" w-10/12"><p>WEEk 3 DAY 1 Thursday</p></div>
                <div className=" flex gap-4 pt-1 text-lg">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
            </div>
            <hr className=" w-full absolute left-0 border-gray-300" />

            <WorkOutLog />
            <WorkOutLog />
            <WorkOutLog />


            <Footer />
        </>
    );

}
export default Home;