import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./calendar.css";
import { Link } from 'react-router-dom';


  //classnames 모듈 사용
  //클래스를 boolean 값에 따라 할당 여부를 결정 할 수 있음
  const cn = classNames.bind(style); //calendar.css와 연결 (style).weekday

  
  //Date 객체 생성
  let date = new Date();
  
  const Calendar = () => {
  
  //오늘 날짜, 시간
  const today = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay()
  };
  //요일
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  
  //현재 달력 연도
  const [selectedYear, setSelectedYear] = useState(today.year);
  //현재 달력 달
  const [selectedMonth, setSelectedMonth] = useState(today.month);

  //이전달,이번달 마지막 날 Date 객체 정보
  const prevLast = new Date(selectedYear, selectedMonth, 0);
  const thisLast = new Date(selectedYear, selectedMonth + 1, 0)

  //이전달 마지막 날짜와 요일 
  const prevLastDate =prevLast.getDate();
  const prevLastDay = prevLast.getDay();

  //이번달 마지막 날짜와 요일
  const thisLastDate = thisLast.getDate();
  const thisLastDay = thisLast.getDay();

  //날짜를 담을 배열
  const prevDates = [];
  const nextDates = [];
  const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);

  //지난달 마지막 날짜 - i
  //지난달 날짜 배열에 할당
  if(prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      prevDates.unshift(prevLastDate - i);
    }
  }

  //다음달 날짜 배열에 할당
  for(let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push(i);
  }  
  
  //세 배열 합치기
  const dates = [...prevDates, ...thisDates, ...nextDates];
  
  //이번달 첫날 찾기
  const firstDateIndex = dates.indexOf(1);
  //이번달 마지막날 찾기
  const lastDateIndex = dates.lastIndexOf(thisLastDate);

  //오늘 날짜 찾기
  //오늘 날짜를 뒤에서부터 찾아서 할당
  const todayDateIndex1 = dates.lastIndexOf(today.date);
  //오늘 날짜를 앞에서부터 찾아서 할당
  const todayDateIndex2 = dates.indexOf(today.date);
  
  //오늘 날짜
  let todayDate;
  
  //날짜
  const returnDate = () => {
    
    //날짜배열에 함수 할당
    dates.forEach((date, i) => {

      //condition 변수에 이번달에 this, 다른달에 other 클래스 지정
      const condition = i >= firstDateIndex && i < lastDateIndex + 1? 'this' : 'other';

      //오늘 날짜에 따라 인덱스를 앞에서부터 찾을지 뒤에서부터 찾을지 조건문
      //오늘 날짜를 찾으면 todayDate에 'today' 할당
      if(selectedYear === today.year && selectedMonth === today.month && today.date > 15) {
      todayDate = (i === todayDateIndex1) ? 'today' : `${i}`;
      } else if(selectedYear === today.year && selectedMonth === today.month && today.date < 15) {
      todayDate = (i === todayDateIndex2) ? 'today' : `${i}`;
      }
      dates[i] =`<div class="date" onclick="${prevMonth}"> <span class="${condition}" id="${todayDate}">${date}</span></div>`;
  })       

  return dates;
  };

  
  //이전달 이동 함수
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  //다음달 이동 함수
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  //오늘 날짜로 이동 함수
  const goToday = () => {
    setSelectedYear(today.year);
    setSelectedMonth(today.month);
  };


  //토요일, 일요일에 class 추가
  const returnWeek = () => {
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cn(
            {weekday: true}, //weekday 클래스 추가
            // 'weekday',
            {sunday: v === "일"}, //v === "일" 조건이 true면 sunday 클래스 추가
            {saturday: v === "토"} //v ==="토" 조건이 true면 saturday 클래스 추가
            )}
            >
          {v}
        </div>
      );
    });
    return weekArr;
  }; 

  return (
    <>
      <div className="container">
        <div className="title">
          <h3>
            {selectedYear}년 {selectedMonth + 1}월
          </h3>
          <div className="pagination">
            <button onClick={prevMonth}>◀︎</button>
            <button onClick={goToday}>Today</button>
            <button onClick={nextMonth}>▶︎</button>
          </div>
        </div>
        <div className="week">{returnWeek()}</div>
        {/* <Link to={`/date/${date.id}`}> */}
          <div className="dates" dangerouslySetInnerHTML={{__html: returnDate().join('')}}></div>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Calendar;