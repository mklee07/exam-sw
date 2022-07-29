import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from "./date.module.css";


const Date = () => {

    const { id } = useParams(); // const 변수명 = useParams().파라미터명;
    // console.log(id)
    const navigate = useNavigate();

    return (
        <>
            <div className="container">
            <div className={style.header}>
            {id}일 페이지
            </div>
                <textarea  placeholder='내용 입력' className={style.textarea}></textarea>
                {/* <input type="textarea" autofocus="true" placeholder='내용 입력' className={style.textarea}></input> */}
                <div className={style.button}>
                <button className={style.prev} onClick={() => navigate(-1)}>이전</button>
                <input type="submit" value="전송"></input>
                </div>
            </div>
        </>
    )
}

export default Date;