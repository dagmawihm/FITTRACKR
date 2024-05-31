import React from "react";
import { LineChart } from '@mui/x-charts';

function Progress() {

    function getRandomNumbers(count, min, max) {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    const xAxisData = [1, 2, 3, 4, 5];
    const yAxisData = getRandomNumbers(5, 100, 200);


    return (
        <div>
            <h2 className="text-lg font-bold mb-4">xxxxxxpropsxxxx</h2>
            <LineChart className="w-full h-full"
                xAxis={[
                    {
                        label: "Date",
                        data: xAxisData
                    },
                ]}
                yAxis={[{ label: "lbs" }]}
                series={[
                    {
                        data: yAxisData,
                        area: true,
                        color: 'rgba(55, 65, 81, 0.8)',
                    },
                ]}
                height={400}
            />
            <div className="flex flex-col gap-2">
                <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer">
                    <span>05/19/2024</span>
                    <span>150 lbs</span>
                    <span>12 REPS</span>
                </div>
                <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer">
                    <span>05/19/2024</span>
                    <span>150 lbs</span>
                    <span>12 REPS</span>
                </div>
                <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer">
                    <span>05/19/2024</span>
                    <span>150 lbs</span>
                    <span>12 REPS</span>
                </div>
                <div className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer">
                    <span>05/19/2024</span>
                    <span>150 lbs</span>
                    <span>12 REPS</span>
                </div>
            </div>
        </div>


    );
}

export default Progress;