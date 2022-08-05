import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/_detail.scss';
import axios from 'axios';
import qs from 'qs';
// import api from './api/Api';

const Detail = () => {
    const { id } = useParams();
    const [apiData, setApiData] = useState([]);

    const [contents, setContents] = useState();

    const api = axios.create({
        baseURL: 'http://192.168.180.14:3000/calendar',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const getDetail = useEffect(() => {
        axios
            .get(`http://192.168.180.14:3000/calendar/getDetail?date=${id}`)
            .then((res) => {
                // console.log(
                //     'getDetail res.data.contents',
                //     res.data[0].contents,
                // );
                console.log('getDetail res.data', res);
                setApiData(res.data[0]);
                // setContents(res.data[0].contents);
            })
            .catch((Error) => {
                console.log(Error);
            });
    }, []);

    const addPosts = () => {
        const req = qs.stringify({
            contents: contents,
            date: id,
        });
        console.log('addPosts');
        api.post(`/setTodo`, req)
            .then((res) => {
                setApiData(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        // setContents('');
        // setDate('');
    };

    const updatePosts = () => {
        const req = qs.stringify({
            contents: contents,
            id: id,
        });
        console.log('updatePosts');
        api.put(`/updateTodo`, req)
            .then((res) => {
                setApiData(res.data);
                console.log('updatePosts', res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        //setContents('');
        // setDate('');
    };

    const deletePost = () => {
        const req = qs.stringify({
            id: apiData.id,
        });
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
        // console.log(req);

        //`http://192.168.180.14:3000/calendar/delTodo?date=${id}`

        axios
            .delete(`http://192.168.180.14:3000/calendar/delTodo`, {
                headers,
                req,
            })
            .then((res) => {
                // setApiData(res.data);
                console.log('delete data:', res.data);
            })
            .then((success) => {
                alert(success);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleChange = (e) => {
        setContents(e.target.value);
    };
    return (
        <>
            <div className="container">
                <div className="detailHeader">
                    <div className="detailDate">
                        {apiData.date}
                        {/* {id} */}
                    </div>
                    {/* <select><option>{apiData[0].id}</option></select> */}
                    <div className="dateBox">
                        작성일 : {apiData.write_date}
                        수정일 : {apiData.update_date}
                    </div>
                </div>

                <textarea
                    placeholder="내용 입력"
                    onChange={handleChange}
                    value={contents}
                    className="detailContant"
                ></textarea>
                <div className="btnBox">
                    <Link to="/">
                        <button className="prevBtn">이전</button>
                    </Link>
                    {/* <Link to="/"> */}
                    <form>
                        <button
                            type="button"
                            className="subBtn"
                            onClick={addPosts}
                        >
                            저장
                        </button>
                        <button
                            type="button"
                            className="subBtn"
                            onClick={updatePosts}
                        >
                            수정
                        </button>
                        <button
                            type="button"
                            className="subBtn"
                            onClick={deletePost}
                        >
                            삭제
                        </button>
                    </form>
                    {/* </Link> */}
                </div>
            </div>
        </>
    );
};
export default Detail;
