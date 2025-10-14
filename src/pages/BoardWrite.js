import { useState } from 'react';
import './BoardWrite.css';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
const BoardWrite = ({user}) => {
    const [title, setTitle] = useState("");
    const [content, setContent]= useState("");
    const navigete = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 로그인 한 유저만 글쓰기 허용
        if(!user){
            alert("로그인 후 글 작성 가능합니다.");
            return navigete("/board");
        }
        try {
            await api.post("/api/board", {title, content});
            alert("글 작성 완료!")
            navigete("/board");
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <div className='write-container'>
            <h2>글 쓰기</h2>
            <form onSubmit={handleSubmit} className='write_form'>
                <input type='text'placeholder='제목' value={title}
                    onChange={(e) => setTitle(e.target.value)}></input>
                <textarea placeholder='내용' value={content}
                    onChange={(e) => setContent(e.target.value)}>
                </textarea>
                <div className='button_group'>
                    <button type='submit'>등록</button>
                    <button type='button' onClick={() => navigete("/board")}>취소</button>
                </div>
            </form>

        </div>
    )
};

export default BoardWrite;