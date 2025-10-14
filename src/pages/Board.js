import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './Board.css';

const Board = ({user}) => {
    const[posts, setPosts]= useState([]);

    const loadPosts = async() => {
        try {
            const res = await api.get("/api/board"); // 모든 글 가져오기 요청
            setPosts(res.data);
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        loadPosts();
    },[]);

    const formatDate = (dateString)  => {
        const date = new Date(dateString);
        return dateString;
    }
    return(
        <div className='container'>
            <h2>게시판</h2>
            <table className='board_table'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    { posts.length > 0 ? (
                        posts.reverse().map((p, idx) => ( // reverse => 최신글이 위로 오게
                            <tr key={p.id}>
                                <td>{posts.length - idx}</td>
                                <td>{p.title}</td>
                                <td>{p.author.username}</td>
                                <td>{formatDate(p.createdate)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">
                                게시글이 없습니다.
                            </td>
                        </tr>
                    )
                }
                    
                </tbody>
            </table>
            <div className='write_button_container'>
                <button className='write_button'>글쓰기</button>
            </div>
        </div>
    )
};

export default Board;