import React from 'react';

const CalendarDay = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'];

    for (let i =0; i < 7; i++) {
        days.push(
            <div style={{fontSize :"20px"}} className={`col ${
                i==0
                ? 'sunday'
                : i==6
                ? 'saturday'
                : ''}`
            } key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>
}
export default CalendarDay;