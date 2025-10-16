import { useState } from "react";
import api from "../api/axiosConfig";

const PostEdit = ({ post, setPost, setEditing }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async () => {
    if (!window.confirm("정말 수정하시겠습니까?")) {
      return;
    }
    try {
      const res = await api.put(`/api/board/${post.id}`, { title, content });
      alert("게시글 수정 성공!");
      setPost(res.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        alert("수정 권한이 없습니다.");
      } else {
        alert("수정 실패");
      }
    }
  };
  return (
    <div>
      <div className="edit_form">
        <h2>글 수정하기</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="button_group">
          <button className="edit_button" onClick={handleUpdate}>
            저장
          </button>
          <button className="delete_button" onClick={() => setEditing(false)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostEdit;
