import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import style from "./calendar.css";

const cx = classNames.bind(style);

const Calendar = () => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };
  const week = ["일", "월", "화", "수", "목", "금", "토"]; 
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); 

  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  },);

  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  },);

  const monthControl = useCallback(() => {
    let monthArr = [];
    for(let i = 0; i < 12; i++) {
      monthArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}월
        </option>
      );
    }
    return (
      <select
        onChange={changeSelectMonth}
        value={selectedMonth}
        >
        {monthArr}
        </select>
    );
  },);

  const yearControl = useCallback(() => {
    let yearArr = [];
    const startYear = today.year - 10;
    const endYear = today.year + 10;
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={i} value={i}>
          {i}년
        </option>
      );
    }
    return (
      <select
        onChange={changeSelectYear}
        value={selectedYear}
      >
        {yearArr}
      </select>
    );
},);

  const changeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };
  const changeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value))
  };

  const returnWeek = useCallback(() => {
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cx(
            {weekday: true},
            {sunday: v === "일"},
            {saturday: v === "토"}
          )}
        >
          {v}
        </div>
      );
    });
    return weekArr;
  },); 

  const returnDay = useCallback(() => {
    let dayArr = [];

    for(const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if(week[day] === nowDay) {
        for(let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <div
              key={i + 1}
              className={cx(
                {
                  today:
                    today.year === selectedYear &&
                    today.month === selectedMonth &&
                    today.date === i + 1,
                },
                {weekday: true},
                {
                  sunday:
                    new Date(
                      selectedYear,
                      selectedMonth - 1,
                      i + 1
                    ).getDay() === 0,
                },
                {
                  saturday:
                    new Date(
                      selectedYear,
                      selectedMonth - 1,
                      i + 1
                    ).getDay() === 6,
                }
              )} 
            >
              {i + 1}
            </div>
          );
        }
      } else {
        dayArr.push(<div className="weekday"></div>);
      }
    }
    return dayArr;
  },);

  return (
    <div className="container">
      <div className="title">
        <h3>
          {yearControl()}년 {monthControl()}월
        </h3>
        <div className="pagination">
          <button onClick={prevMonth}>◀︎</button>
          <button onClick={nextMonth}>▶︎</button>
        </div>
      </div>
      <div className="week">{returnWeek()}</div>
      <div className="date">{returnDay()}</div>
    </div>
  );
};

export default Calendar;