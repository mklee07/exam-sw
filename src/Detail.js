import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const Detail = () => {

    const {id} = useParams();
    
    return (
        <>
            <div className="detail">
                <div className="memo">
                    {id}일
                </div>
                <textarea placeholder='내용 입력' className="textarea"></textarea>
                <div className="btnBox">
                    <Link to="/">
                        <button className="prevBtn">이전</button>
                    </Link>
                    <input type="sumbit" value="전송"></input>
                </div>
            </div>
        </>
    )
}
export default Detail;