import React, { useState } from "react";
import Logo from "./Images/logo.png"
import { NavLink } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function Header({ user, setUser }) {
    const [showMenu, setShowMenu] = useState(false);


    const handleLogout = async () => {
        try {
            const response = await axios.post('/user/logout');
            if (response.data.message === 'Logged out successfully') {
                setUser(false);
                setShowMenu(!showMenu);
            }
        }
        catch (e) {
            alert(e);
        }

    };

    return (
        <div>
            <div className="flex flex-col justify-between items-center">
                <div className="flex flex-row items-center gap-28">
                    <NavLink to={"/"}><img src={Logo} onClick={() => setShowMenu(false)} alt="Logo" className="w-14" /></NavLink>
                    <h1 className="font-normal text-2xl">Fittracker</h1>
                    <FontAwesomeIcon className="text-2xl" icon={faBars} onClick={() => setShowMenu(!showMenu)} />
                </div>
                {showMenu && (
                    <div className="bg-slate-400 shadow-2xl absolute rounded-md my-12 px-3 py-1 flex flex-row self-end z-10">
                        <ul>
                            {user ? (
                                <>
                                    <NavLink to={"/"}><li onClick={() => setShowMenu(!showMenu)} className="hover:bg-slate-300">Home</li></NavLink>
                                    <NavLink to={"/profile"}><li onClick={() => setShowMenu(!showMenu)} className="hover:bg-slate-300">Profile</li></NavLink>
                                    <NavLink to={"/notification"}><li onClick={() => setShowMenu(!showMenu)} className="hover:bg-slate-300">Notification <span className="px-1 rounded-lg text-sm text-white bg-red-700">4</span></li></NavLink>
                                    <NavLink to={"/settings"}><li onClick={() => setShowMenu(!showMenu)} className="hover:bg-slate-300">Settings</li></NavLink>
                                    <NavLink to={""}><li onClick={handleLogout} className="hover:bg-slate-300">Logout</li></NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to={"/login"}><li onClick={() => setShowMenu(!showMenu)} className="hover:bg-slate-300">Login</li></NavLink>
                                    <NavLink to={"/signup"}><li onClick={() => setShowMenu(!showMenu)} className="hover:bg-slate-300">Sign Up</li></NavLink>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <hr className=" w-full absolute mt-1 left-0 border-gray-300" />
        </div>
    );
}

export default Header;