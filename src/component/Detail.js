import React from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../style/_detail.scss'

const Detail = () => {

    const {id} = useParams();

    return (
        <>
            <div className="container">
                <div className="detailHeader">
                    <div className="memo">
                        {id}
                    </div>
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