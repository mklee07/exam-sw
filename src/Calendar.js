import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './component/CalendarHeader';
import CalendarDay from './component/CalendarDay'
import CalendarDate from './component/CalendarDate';
import './style/_style.scss'

const Calendar = () => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }
    const todayMonth = () => {
        setCurrentMonth(new Date());
    }
    
    return (
        <div className='calendar'>
            <CalendarHeader
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                prevMonth={prevMonth}
                todayMonth={todayMonth}
                nextMonth={nextMonth}
            />
            <CalendarDay />
            <CalendarDate
                currentMonth={currentMonth}
                selectedDate={selectedDate}
            />
        </div>
    )
}

export default Calendar;