import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import CalendarDate from './CalendarDate';
import '../../style/style.scss';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const todayMonth = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="calendar">
      <CalendarHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        prevMonth={prevMonth}
        todayMonth={todayMonth}
        nextMonth={nextMonth}
      />
      <CalendarDay />
      <CalendarDate currentMonth={currentMonth} selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
