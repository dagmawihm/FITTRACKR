import React, { useState } from "react";
import { FormControlLabel, Switch } from '@mui/material';


function Privacy() {
    const [share, setShare] = useState(true);

    const handleChange = (event) => {
        setShare(!share);
      };

    return (

        <div id="personalinfo">
            <div className=" flex flex-col gap-5 mt-5">

                <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4">
                    <span className="mt-1">Share Progress with Friends</span>
                    <span><FormControlLabel control={<Switch checked={share} onChange={handleChange}/>} label="Yes" /></span>
                </div>

                <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4">
                    <span className="mt-1">email me</span>
                    <span><FormControlLabel control={<Switch checked={share} onChange={handleChange}/>} label="Yes" /></span>
                </div>

            </div>
        </div>

    );
}

export default Privacy;