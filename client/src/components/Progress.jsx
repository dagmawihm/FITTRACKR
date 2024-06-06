import React, { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Progress({ exerciseName, setsHistory }) {
    const handlePickerChange = (date, name) => {
        setPickedDate((currData) => ({
            ...currData,
            [name]: date,
        }));
    };

    const handleDate = (name) => {
        setDatePickerDiv((currData) => ({
            ...currData,
            year: name === 'year' ? !currData.year : false,
            month: name === 'month' ? !currData.month : false,
            div: true,
        }));
    };

    Chart.register(...registerables);

    const [chartData, setChartData] = useState({ yAxisData: [], xAxisData: [] });
    const [datePickerDiv, setDatePickerDiv] = useState({ div: false, month: false, year: false });
    const [pickedDate, setPickedDate] = useState({ month: dayjs(), year: dayjs() });

    const processFirstSetData = (setsHistory) => {
        const firstSetsByDate = {};

        // Sort sets by date to ensure correct order
        const sortedSets = setsHistory.map(set => ({
            ...set,
            date: new Date(set.date)  // Convert date string to Date object
        })).sort((a, b) => a.date - b.date);

        sortedSets.forEach(set => {
            const dateStr = set.date.toISOString().split('T')[0];  // Get date in YYYY-MM-DD format
            if (!firstSetsByDate[dateStr]) {
                firstSetsByDate[dateStr] = set;  // Record only the first set of the day
            }
        });

        return Object.keys(firstSetsByDate).map(date => {
            const set = firstSetsByDate[date];
            return {
                date,
                weight: set.weight,
                reps: set.reps
            };
        });
    };

    const extractDateAndWeight = (weightHistory, year, month = null) => {
        let dataByMonth = {};
        let filteredData = [];

        weightHistory.forEach(record => {
            let date = new Date(record.date);
            let recordMonth = date.getUTCMonth() + 1; // Use getUTCMonth to avoid timezone issues
            let recordYear = date.getUTCFullYear(); // Use getUTCFullYear to avoid timezone issues

            if (recordYear === year) {
                if (month === null || recordMonth === month) {
                    if (month !== null) {
                        filteredData.push(record);
                    } else {
                        if (!dataByMonth[recordMonth]) {
                            dataByMonth[recordMonth] = [];
                        }
                        dataByMonth[recordMonth].push(record.weight);
                    }
                }
            }
        });

        if (month !== null) {
            let xAxisData = filteredData.map(record => String(new Date(record.date).getUTCDate()).padStart(2, '0')); // Use getUTCDate
            let yAxisData = filteredData.map(record => record.weight);
            return { xAxisData, yAxisData };
        } else {
            let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let xAxisData = Object.keys(dataByMonth).map(month => monthNames[month - 1]);
            let yAxisData = [];
            Object.values(dataByMonth).forEach(monthWeights => {
                let averageWeight = monthWeights.reduce((acc, val) => acc + val, 0) / monthWeights.length;
                yAxisData.push(averageWeight);
            });
            return { xAxisData, yAxisData };
        }
    };

    useEffect(() => {
        const processedData = processFirstSetData(setsHistory);
        const { xAxisData, yAxisData } = datePickerDiv.month
            ? extractDateAndWeight(processedData, pickedDate.month.year(), pickedDate.month.month() + 1)
            : extractDateAndWeight(processedData, pickedDate.year.year());

        setChartData({ xAxisData, yAxisData });
    }, [setsHistory, pickedDate, datePickerDiv]);

    const chartDataSets = {
        labels: chartData.xAxisData,
        datasets: [
            {
                data: chartData.yAxisData,
                fill: true,
                backgroundColor: 'rgba(55,65,81,1)',
                borderColor: 'rgba(55,65,81,1)',
                tension: 0.3,
                pointBackgroundColor: 'rgba(255,255,255,1)',
                pointBorderColor: 'rgba(0,0,0,1)',
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">{exerciseName}</h2>
            <div className="flex justify-center gap-12">
                <div onClick={() => handleDate("month")}>
                    <span className="bg-slate-400 px-6 rounded-md">M</span> <span className="text-xl"><FontAwesomeIcon icon={faCalendarDays} /></span>
                </div>
                <div onClick={() => handleDate("year")}>
                    <span className="bg-slate-400 px-6 rounded-md">Y</span> <span className="text-xl"><FontAwesomeIcon icon={faCalendarDays} /></span>
                </div>
            </div>
            {datePickerDiv.div && (
                <div className="flex justify-center gap-12 mt-2">
                    {datePickerDiv.month && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Month"
                                openTo="month"
                                views={['year', 'month']}
                                sx={{ width: '190px' }}
                                value={pickedDate.month}
                                onChange={(newValue) => handlePickerChange(newValue, 'month')}
                            />
                        </LocalizationProvider>
                    )}
                    {datePickerDiv.year && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Year"
                                openTo="year"
                                views={['year']}
                                sx={{ width: '110px' }}
                                value={pickedDate.year}
                                onChange={(newValue) => handlePickerChange(newValue, 'year')}
                            />
                        </LocalizationProvider>
                    )}
                </div>
            )}
            <Line className="" data={chartDataSets} options={chartOptions} />
            <div className="h-96 overflow-y-auto flex flex-col gap-2 my-2">
                {Object.entries(
                    setsHistory
                        .slice() // Make a copy to avoid mutating the original array
                        .reverse() // Reverse the array to display the latest date first
                        .reduce((acc, set) => {
                            const dateStr = new Date(set.date).toLocaleDateString();
                            if (!acc[dateStr]) {
                                acc[dateStr] = [];
                            }
                            acc[dateStr].unshift(set); // Insert the set at the beginning to reverse the order
                            return acc;
                        }, {}) // Initialize an empty object to accumulate sets by date
                ).map(([date, sets], index, array) => (
                    <React.Fragment key={date}>
                        {sets.map((set, setIndex) => (
                            <div key={setIndex} className="flex justify-between bg-slate-100 rounded-md py-2 px-4 cursor-pointer">
                                <span>{date}</span>
                                <span>{set.weight} lbs</span>
                                <span>{set.reps} REPS</span>
                            </div>
                        ))}
                        {index !== array.length - 1 && <hr className=" my-2" />}
                    </React.Fragment>
                ))}
            </div>



        </div>
    );
}

export default Progress;
