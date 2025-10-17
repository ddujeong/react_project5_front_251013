import { useNavigate, useParams } from "react-router-dom";
import "./BoardDetail.css";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import CommentForm from "../component/CommentForm";
import PostEdit from "../component/PostEdit";
import PostView from "../component/PostView";
const BoardDetail = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [post, setPost] = useState(null); // 해당글 id로 요청한 글 객체
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // board/:id id 파라미터 받아오기
  const loadPost = async () => {
    // 특정 글 id로 글 1개 요청하기
    try {
      setLoading(true);
      const res = await api.get(`/api/board/${id}`);
      setPost(res.data); //특정 글 id 객체를 state에 등록
    } catch (err) {
      console.error(err);
      setError("해당 게시글은 존재하지 않습니다.");
      // alert("해당 게시글은 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);
  if (loading) return <p>게시글 로딩 중....</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="detail_container">
      {editing ? (
        <PostEdit post={post} setPost={setPost} setEditing={setEditing} />
      ) : (
        <PostView
          post={post}
          user={user}
          setEditing={setEditing}
          setPost={setPost}
        />
      )}
      {/* 댓글 섹션 시작  */}
      <div className="comment_section">
        <CommentForm id={id} user={user} />
      </div>
    </div>
  );
};

export default BoardDetail;
