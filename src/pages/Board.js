import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './Board.css';
import { useNavigate } from 'react-router-dom';

const Board = ({user}) => {
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const loadPosts = async(page = 0) => {
        try {
            setLoading(true);
            const res = await api.get(`/api/board?page=${page}&size=10`); // 모든 글 가져오기 요청
            setPosts(res.data.posts); // posts => 전체 게시글(게시글의 배열)
            setCurrentPage(res.data.currentPage); // 현재 페이지
            setTotalItems(res.data.totalItems); // 전체 게시글 수
            setTotalPages(res.data.totalPages); // 전체 페이지 수 
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
        loadPosts(currentPage);
    },[currentPage]);

    // 페이지 번호 그룹 배열 반한 함수(10개만 표시)
    // ex> 총 게시글 수 (157) => 16페이지 필요 [0,1,2,3,4,5,6,7,8,9]
    // >(&gt;) => [10,11,12,13,14,15]
    const getPageNumbers = () => {
        const startPage = Math.floor(currentPage / 10) * 10;
        const endPage = Math.min(startPage + 10 , totalPages );
        const pages = [];
        for (let i = startPage; i < endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    // 날짜 포맷 함수
    const formatDate = (dateString)  => {
        return dateString.substring(0,10);
    }
    return(
        <div className='container'>
            <h2>게시판</h2>
            <div className='write_button_container'>
                <button onClick={handelWrite } className='write_button'>글쓰기</button>
            </div>
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
                        posts.map((p, idx) => ( // reverse => 최신글이 위로 오게
                            <tr key={p.id}>
                                <td>{totalItems - (idx + (currentPage * 10))}</td>
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
            {/* 페이징 시작 */}
            <div className='pagination'>
                <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>&lt;&lt;</button>
                <button onClick={() => setCurrentPage(currentPage -1)} disabled={currentPage === 0}>&lt;</button>
                {getPageNumbers().map((num) =>(
                    <button className={num === currentPage ? "active" : ""} key={num} onClick={() => setCurrentPage(num)}>{num + 1}</button>
                )) }
                <button onClick={() => setCurrentPage(currentPage +1)} disabled={currentPage === (totalPages -1) || totalPages ===0} >&gt;</button>
                <button onClick={() => setCurrentPage(totalPages-1)} disabled={currentPage === totalPages-1 || totalPages ===0}>&gt;&gt;</button>
            </div>
            
        </div>
    )
};

export default Board;