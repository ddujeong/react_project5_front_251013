import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import CommentView from "../component/CommentView";

const CommentForm = ({ id, user }) => {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const loadComments = async () => {
    // 특정 글 id로 댓글 목록 요청하기
    try {
      const res = await api.get(`/api/comment/${id}`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("해당 게시글은 존재하지 않습니다.");
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인 후 댓글 작성 가능합니다.");
      navigate("/login");
      return;
    }
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요");
      return;
    }
    try {
      const res = await api.post(`/api/comment/${id}`, { content: newComment });
      alert("댓글 작성 완료!");
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error(error);
      alert("댓글 작성 실패");
    }
  };
  useEffect(() => {
    loadComments();
  }, [id]);
  return (
    <div>
      <h4>댓글 작성</h4>
      <form onSubmit={handleComment} className="comment_form">
        <textarea
          placeholder="댓글을 작성해주세요..."
          disabled={!user}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button disabled={!user} type="submit" className="comment_button">
          작성
        </button>
      </form>
      <CommentView
        id={id}
        user={user}
        comments={comments}
        loadComments={loadComments}
      />
    </div>
  );
};
export default CommentForm;
