import { useNavigate } from 'react-router-dom';
import './BoardDetail.css';
import { useState } from 'react';
const BoardDetail = ({user}) => {
    const navigate = useNavigate();
    const [post, setPost] = useState(null); // 해당글 id로 요청한 글 객체
    const loadPost = async() => { // 특정 글 id로 글 1개 요청하기

        
    }
    return(
        <div className='detail_container'>
            <h2>오늘 첫 글입니다</h2>
            <p className='author'>작성자 : tiger</p>
            <div className='content'>오늘 글 내용입니다</div>

            <div className='button_group'>
                <button onClick={() => navigate("/board")}>글 목록</button>
                {/* 로그인 한 유저 본인이 쓴 글만 수정 삭제 가능 */}
                <button>수정</button>
                <button>삭제</button>
            </div>
        </div>
    )
};

export default BoardDetail;