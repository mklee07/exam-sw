import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import './_style.scss'

//header 부분 년월, 버튼
const RenderHeader = ({currentMonth, setCurrentMonth, prevMonth, nextMonth, todayMonth}) => {

    const [search, setSearch] = useState();

    const onChange = (e) => {
        setSearch(e.target.value)
    }
    
    const onSearch = (e) => {
        e.preventDefault(); // 이거 없으면 검색후 다시 화면이 새로고침됨
        setCurrentMonth(addMonths(currentMonth, (search - format(currentMonth, 'yyyy'))*12))
    }

    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    {format(currentMonth, 'yyyy')}년
                <span className="text month">
                    {format(currentMonth, 'M')}월
                    {/* {format(currentMonth, 'dd')}일 */}
                </span>
                </span>
                    <form onSubmit={e => onSearch(e)}>
                        <input type="text" value={search} onChange={onChange} placeholder="ex) 2023"/>
                        <button type="submit">Search</button>
                    </form>
            </div>

            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}/>
                <Icon icon="bi:circle-fill" onClick={todayMonth}/>
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}/>
            </div>
        </div>
    );
};

//요일 부분
const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i =0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>
}

//날짜 부분
const RenderCells = ({ currentMonth, selectedDate, onDateClick}) => {
    const monthStart = startOfMonth(currentMonth); //현재 선택한 달 1일
    const monthEnd = endOfMonth(monthStart); //현재 선택한 달 마지막일
    const startDate = startOfWeek(monthStart); //현재 선택한 달력 첫번째 일
    const endDate = endOfWeek(monthEnd); //현재 선택한 달력 마지막 일

    const rows = []; 
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) { //달력 첫번째 일 부터 마지막일 까지
        for (let i = 0; i < 7; i++) { //일~토 
            formattedDate = format(day, 'd'); //날짜 문자열로 변환
            const cloneDay = day; //startDate
            days.push(
                <div  
                    className={`col cell ${
                        !isSameMonth(day, monthStart) //이번달이 아니면
                            ? 'disabled' //선택불가
                            :isSameDay(day, selectedDate) //오늘이면
                            ? 'selected' //css로 표시
                            : format(currentMonth, 'M') !== format(day, 'M') //이번달이 아니면
                            ? 'not-valid' //css로 회색 표시
                            : 'valid'
                     }`
                    }
                    id={`${format(day, 'yyyy')}-${format(day, 'MM')}-${format(day, 'dd')}`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <Link to={`/detail/${format(day, 'yyyy')}-${format(day, 'MM')}-${format(day, 'dd')}`}>
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M') //이번달이 아니면
                            ? 'text not-valid date'
                            : 'date'
                         }
                    >
                        {formattedDate}  
                     </span>   
                    </Link>
                </div>
            );
            day = addDays(day, 1); //달력 첫 번째부터 날짜 +1
        };
        rows.push( 
            <div className="row" key={day}>
                {days} 
            </div>
        );
        days = []; //초기화
    }
    return <div className="body">{rows}</div>
};

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());


    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }
    const onDateClick = () => {
        // console.log(day)
    }
    const todayMonth = () => {
        setCurrentMonth(new Date());
    }
    
    return (
        <div className='calendar'>
            <RenderHeader
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                prevMonth={prevMonth}
                todayMonth={todayMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    )
}

export default Calendar;