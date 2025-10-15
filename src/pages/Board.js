import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './Board.css';
import { useNavigate } from 'react-router-dom';

const Board = ({user}) => {
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadPosts = async() => {
        try {
            setLoading(true);
            const res = await api.get("/api/board"); // 모든 글 가져오기 요청
            setPosts(res.data);
        } catch (error) {
            console.error(error);
            setError("게시글을 불러오는데 실패하였습니다.");
            setPosts([]);
        } finally{
            setLoading(false);
        }
    };
    const handelWrite = () => {
        if(!user){
            alert("로그인 후 글 작성 가능합니다.");
            return navigate("/board");
        }
        return navigate("/board/write")
    }
    useEffect(() => {

        loadPosts();
    },[]);

    const formatDate = (dateString)  => {
        return dateString.substring(0,10);
    }
    return(
        <div className='container'>
            <h2>게시판</h2>
            {loading && <p>게시판 글 리스트 로딩 중...</p>}
            {error && <p style={{color:"red"}}>{error}</p>}
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
                        posts.slice().reverse().map((p, idx) => ( // reverse => 최신글이 위로 오게
                            <tr key={p.id}>
                                <td>{posts.length - idx}</td>
                                <td className='click_title' onClick={() => navigate(`/board/${p.id}`)}>{p.title}</td>
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
                <button onClick={handelWrite } className='write_button'>글쓰기</button>
            </div>
        </div>
    )
};

export default Board;