import React from "react";
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Friends() {


    return (

        <div id="friends">
        <div className=" px-10 mt-7">

            <div className=" flex flex-row border w-full h-9 rounded-lg">
                <input type="text" className="w-full outline-none pl-2" />
                <FontAwesomeIcon className=" h-6 w-6 mt-1 px-1" icon={faMagnifyingGlass} />
            </div>

            <div className="mt-4 flex flex-col gap-5">
                <div className=" flex flex-row justify-between ">
                    <FontAwesomeIcon className=" w-9 h-9" icon={faUser} />
                    <span className=" mt-2">MY WIFE ARSU</span>
                    <span className=" bg-red-200 px-3 py-1 rounded-xl my-1">Remove</span>
                </div>

                <div className=" flex flex-row justify-between ">
                    <FontAwesomeIcon className=" w-9 h-9" icon={faUser} />
                    <span className=" mt-2">MY WIFE ARSU</span>
                    <span className=" bg-red-200 px-3 py-1 rounded-xl my-1">Remove</span>
                </div>

                <div className=" flex flex-row justify-between ">
                    <FontAwesomeIcon className=" w-9 h-9" icon={faUser} />
                    <span className=" mt-2">MY WIFE ARSU</span>
                    <span className=" bg-red-200 px-3 py-1 rounded-xl my-1">Remove</span>
                </div>

                <div className=" flex flex-row justify-between ">
                    <FontAwesomeIcon className=" w-9 h-9" icon={faUser} />
                    <span className=" mt-2">MY WIFE ARSU</span>
                    <span className=" bg-red-200 px-3 py-1 rounded-xl my-1">Remove</span>
                </div>

                <div className=" flex flex-row justify-between ">
                    <FontAwesomeIcon className=" w-9 h-9" icon={faUser} />
                    <span className=" mt-2">MY WIFE ARSU</span>
                    <span className=" bg-red-200 px-3 py-1 rounded-xl my-1">Remove</span>
                </div>
            </div>

        </div>
    </div>

    );
}

export default Friends;