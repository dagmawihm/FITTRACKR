import React, { useState } from "react";
import { faCircleCheck, faEllipsisVertical,  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function WorkOutLog() {
    return (
        <div>
            <div className=" flex flex-row justify-between mt-4">
                <div className=" border p-1">
                    CHEST  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <div className="">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
            </div>

            <div className=" my-2">
                <p>Machine Chest Press</p>
            </div>

            <div className="flex justify-center">

            <div className="flex flex-col w-10/12 gap-4">

                <div className="grid grid-cols-3 gap-4">
                    <div className=" flex justify-center">WEIGHT</div>
                    <div className=" flex justify-center" >REPS</div>
                    <div className=" flex justify-center">LOG</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div><input type="number" className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md" name="" id="" /></div>
                    <div><input type="number" className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md" name="" id="" /></div>
                    <div className=" flex justify-center"> <input className="h-6 w-6 accent-green-600" type="checkbox" /></div>
                </div>
                <hr className=" w-full left-0 border-gray-300" />

                <div className="grid grid-cols-3 gap-4">
                    <div><input type="number" className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md" name="" id="" /></div>
                    <div><input type="number" className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md" name="" id="" /></div>
                    <div className=" flex justify-center"> <input className="h-6 w-6 accent-green-600" type="checkbox" /></div>
                </div>
                <hr className=" w-full left-0 border-gray-300" />

                <div className="grid grid-cols-3 gap-4">
                    <div><input type="number" className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md" name="" id="" /></div>
                    <div><input type="number" className="bg-slate-100 w-full h-8 outline-none pl-2 rounded-md" name="" id="" /></div>
                    <div className=" flex justify-center"> <input className="h-6 w-6 accent-green-600" type="checkbox" /></div>
                </div>
                <hr className=" w-full left-0 border-gray-300" />

            </div>

            </div>
        </div>
    );
}

export default WorkOutLog;
