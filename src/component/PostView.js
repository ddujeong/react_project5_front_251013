import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const PostView = ({ post, user, setEditing }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/board/${post.id}`);
      alert("게시글 삭제 성공!");
      navigate("/board");
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else {
        alert("삭제 실패");
      }
    }
  };

  const isAuthor = user && user === post.author.username;
  return (
    <div>
      <h2>{post.title}</h2>
      <p className="author">작성자 : {post.author.username}</p>
      <div className="content">{post.content}</div>
      <div className="button_group">
        <button onClick={() => navigate("/board")} className="list_button">
          글 목록
        </button>
        {/* 로그인 한 유저 본인이 쓴 글만 수정 삭제 가능 */}
        {isAuthor && (
          <>
            <button className="edit_button" onClick={() => setEditing(true)}>
              수정
            </button>
            <button className="delete_button" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default PostView;
