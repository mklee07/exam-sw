import React, { useEffect, useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
} from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CalendarDate = ({ currentMonth, selectedDate }) => {
    const monthStart = startOfMonth(currentMonth); //현재 선택한 달 1일
    const monthEnd = endOfMonth(monthStart); //현재 선택한 달 마지막일
    const startDate = startOfWeek(monthStart); //현재 선택한 달력 첫번째 일
    const endDate = endOfWeek(monthEnd); //현재 선택한 달력 마지막 일

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let stringDate = '';
    const [apiData, setApiData] = useState();

    // const getContents = (day, endDate) => {
    //     for (let j = 0; 0 <= 33; j++) {
    //         return stringDate === apiData[j]?.date ? apiData[j]?.contents : '';
    //     }
    // };

    // console.log('getContents: ', getContents);

    const getTodos = useEffect(() => {
        axios
            .get(
                `http://192.168.180.14:3000/calendar/getTodos?date=${format(
                    monthStart,
                    'yyyy',
                )}-${format(monthStart, 'MM')}`,
            )
            .then((res) => {
                setApiData(res.data);
                // setContents(res.data.contents);
                console.log('getTodo:', res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    }, []);

    while (day <= endDate) {
        //달력 첫번째 일 부터 마지막일 까지
        for (let i = 0, j = 0; i < 7; i++, j++) {
            //일~토
            formattedDate = format(day, 'd'); //날짜 문자열로 변환
            stringDate = format(day, 'yyyy-MM-dd'); //날짜 문자열로 변환

            days.push(
                <div
                    style={{ fontSize: '15px' }}
                    className={`col cell ${
                        !isSameMonth(day, monthStart) //이번달이 아니면
                            ? 'disabled' //선택불가
                            : isSameDay(day, selectedDate) //오늘이면
                            ? 'selected' //css로 표시
                            : format(currentMonth, 'M') !== format(day, 'M') //이번달이 아니면
                            ? 'not-valid' //css로 회색 표시
                            : 'valid'
                    }`}
                    id={`${format(day, 'yyyy')}-${format(day, 'MM')}-${format(
                        day,
                        'dd',
                    )}`}
                    key={day}
                >
                    <Link
                        to={`/detail/${format(day, 'yyyy')}-${format(
                            day,
                            'MM',
                        )}-${format(day, 'dd')}`}
                    >
                        <span
                            className={
                                format(currentMonth, 'M') !== format(day, 'M') //이번달이 아니면
                                    ? 'text not-valid date'
                                    : 'date'
                            }
                        >
                            {formattedDate}
                            {/* if(stringDate === apiData[j].date){' '} */}
                            {
                                // <div>
                                //     {stringDate === apiData[j]?.date
                                //         ? apiData[j]?.contents
                                //         : ''}{' '}
                                // </div>
                            }
                        </span>
                    </Link>
                </div>,
            );
            day = addDays(day, 1); //달력 첫 번째부터 날짜 +1
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = []; //초기화
    }
    console.log('day', day);
    console.log('days', days);
    console.log('stringDate', stringDate);
    console.log('apiData', apiData);
    // console.log('apiData', apiData[1].contents);
    return <div className="body">{rows}</div>;
};

export default CalendarDate;
