import { useNavigate, useParams } from 'react-router-dom';
import './BoardDetail.css';
import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
const BoardDetail = ({user}) => {
    const navigate = useNavigate();
    const [post, setPost] = useState(null); // 해당글 id로 요청한 글 객체
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [title ,setTitle] = useState("");
    const [content, setContent] = useState("");
    const {id} = useParams(); // board/:id id 파라미터 받아오기
    const loadPost = async() => { // 특정 글 id로 글 1개 요청하기
        try{
            setLoading(true);
            const res = await api.get(`/api/board/${id}`);
            setPost(res.data); //특정 글 id 객체를 state에 등록
            setTitle(res.data.title);
            setContent(res.data.content);
        } catch(err) {
            console.error(err);
            setError("해당 게시글은 존재하지 않습니다.");
            // alert("해당 게시글은 존재하지 않습니다.");
        } finally {
            setLoading(false);
        }
        
    }
    const handleDelete =  async() => {
            if(!window.confirm("정말 삭제하시겠습니까?")){
                return;
            }
            try {
                await api.delete(`/api/board/${id}`);
                alert("게시글 삭제 성공!");
                navigate("/board");
            } catch (error) {
                console.error(error);
                if(error.response.status === 403){
                    alert("삭제 권한이 없습니다.");
                } else{
                    alert("삭제 실패")
                }
            }
        }
        const handleUpdate =  async() => {
            if(!window.confirm("정말 수정하시겠습니까?")){
                return;
            }
            try {
                const res = await api.put(`/api/board/${id}`, {title, content});
                alert("게시글 수정 성공!");
                setPost(res.data);
                setEditing(false);
            } catch (error) {
                console.error(error);
                if(error.response.status === 403){
                    alert("수정 권한이 없습니다.");
                } else{
                    alert("수정 실패")
                }
            }
        }
    useEffect(() => {
        loadPost();
    },[id]);

    if(loading) return <p>게시글 로딩 중....</p>;
    if(error) return <p style={{color:"red"}}>{error}</p>
    if(!post) return <p sytle={{color:"blue"}}>해당 게시글이 존재하지 않습니다.</p>
    const isAuthor = user && user === post.author.username;
    return(
         <div className='detail_container'>
        {editing ? (
            <div className='edit_form'>
                <h2>글 수정하기</h2>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div className='button_group'>
                    <button className='edit_button' onClick={handleUpdate}>저장</button>
                    <button className='delete_button' onClick={() => setEditing(false)}>취소</button>
                </div>
            </div>
        ):(
            <>
            <h2>{post.title}</h2>
            <p className='author'>작성자 : {post.author.username}</p>
            <div className='content'>{post.content}</div>
            <div className='button_group'>
                <button onClick={() => navigate("/board")} className='list_button'>글 목록</button>
                {/* 로그인 한 유저 본인이 쓴 글만 수정 삭제 가능 */}
                {isAuthor && (
                    <>
                        <button className='edit_button' onClick={() => setEditing(true)}>수정</button>
                        <button className='delete_button' onClick={handleDelete}>삭제</button>
                    </>
                )}
            </div>
            </>
        )}
        </div>
    )
};

export default BoardDetail;