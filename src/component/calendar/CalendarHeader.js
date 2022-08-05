import React, { useState } from 'react';
import { format, addMonths } from 'date-fns';
import { Icon } from '@iconify/react';

const CalendarHeader = ({
    currentMonth,
    setCurrentMonth,
    prevMonth,
    nextMonth,
    todayMonth,
}) => {
    //검색
    const [search, setSearch] = useState('');

    //검색 인풋창에 값 바로 출력
    const onChange = (e) => {
        setSearch(e.target.value);
    };

    //검색 값에 맞게 년 변경
    const onSearch = (e) => {
        e.preventDefault(); // 링크 이동 동작을 막아줌
        if (
            search !== '' &&
            search !== undefined &&
            search !== null &&
            search !== 0
        ) {
            setCurrentMonth(
                addMonths(
                    currentMonth,
                    (Number(search) - format(currentMonth, 'yyyy')) * 12,
                ),
            );
        } else {
            // setCurrentMonth(currentMonth)
            alert('년도를 입력하세요');
        }
    };

    return (
        <div className="header row">
            <div className="col col-start" style={{ fontSize: '25px' }}>
                <span className="text">
                    {format(currentMonth, 'yyyy')}년
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                </span>
                <form onSubmit={(e) => onSearch(e)} className="search">
                    <input
                        type="text"
                        value={search}
                        maxLength={4}
                        onChange={onChange}
                        placeholder="ex) 2022"
                    />
                    <button>Search</button>
                </form>
            </div>

            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:circle-fill" onClick={todayMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

export default CalendarHeader;
