import React, { useState } from "react";
import Logo from "./Images/logo.png"
import { NavLink } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <div className="flex flex-col justify-between items-center">
                <div className="flex flex-row items-center gap-28">
                    <NavLink to={"/"}><img src={Logo} alt="Logo" className="w-14" /></NavLink>
                    <h1 className="font-normal text-2xl">Fittracker</h1>
                    <FontAwesomeIcon className="text-2xl" icon={faBars} onClick={() => setShowMenu(!showMenu)} />
                </div>
                {showMenu && (
                    <div className="bg-slate-400 shadow-2xl absolute rounded-md my-12 px-3 py-1 flex flex-row self-end z-10">
                        <ul>
                            <NavLink to={"/"}><li className="hover:bg-slate-300">Home</li></NavLink>
                            <li className="hover:bg-slate-300">Profile</li>
                            <li className="hover:bg-slate-300">Settings</li>
                            <NavLink to={"/login"}><li className="hover:bg-slate-300">Login</li></NavLink>
                            <NavLink to={"/signup"}><li className="hover:bg-slate-300">Sign Up</li></NavLink>

                        </ul>
                    </div>
                )}
            </div>
            <hr className=" w-full absolute mt-1 left-0 border-gray-300" />
        </div>
    );
}

export default Header;