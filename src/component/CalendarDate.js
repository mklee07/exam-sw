import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { Link } from 'react-router-dom';

const CalendarDate = ({ currentMonth, selectedDate}) => {
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
            days.push(
                <div  
                    className={`col cell ${
                        !isSameMonth(day, monthStart) //이번달이 아니면
                        ? 'disabled' 
                        :isSameDay(day, selectedDate) //오늘이면
                        ? 'selected'
                        : format(currentMonth, 'M') !== format(day, 'M') //이번달이 아니면
                        ? 'not-valid' 
                        : 'valid'
                     }`
                    }
                    id={`${format(day, 'yyyy')}-${format(day, 'MM')}-${format(day, 'dd')}`}
                    key={day}
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
export default CalendarDate;