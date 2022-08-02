import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { daysToWeeks, format} from 'date-fns';


const Detail = ({currentMonth,selectedDate,days}) => {

    const {id} = useParams();

    return (
        <>
            <div className="detail">
                <div className="memo">
                {/* {format(currentMonth, 'yy')}년
                {format(currentMonth, 'MM')}월 */}
                    {id}
                </div>
                <textarea placeholder='내용 입력' className="textarea"></textarea>
                <div className="btnBox">
                    <Link to="/">
                        <button className="prevBtn">이전</button>
                    </Link>
                    <Link to="/">
                    <button type="button" className="subBtn" onClick={ () => {alert(id)}}>전송</button>
                    </Link>
  
                </div> 
            </div>
        </>
    )
}
export default Detail;