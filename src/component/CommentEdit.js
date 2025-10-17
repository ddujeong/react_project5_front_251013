import { useState } from "react";
import api from "../api/axiosConfig";

const CommentEdit = ({ user, loadComments, comment }) => {
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/comment/${commentId}`);
      alert("댓글 삭제 성공!");
      loadComments();
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else {
        alert("삭제 실패");
      }
    }
  };
  console.log(comment);
  // 댓글 수정 이벤트 함수 => 백엔드에 수정요청 보내줌
  const handleCommentUpdate = async (commentId) => {
    if (!window.confirm("정말 수정하시겠습니까?")) {
      return;
    }
    try {
      const res = await api.put(`/api/comment/${commentId}`, {
        content: editingCommentContent,
      });
      alert("댓글 수정 성공!");
      setEditingCommentContent("");
      setEditingCommentId(null);
      loadComments();
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
      <div className="comment_edit_section">
        {editingCommentId === comment.id ? (
          <>
            {/* 댓글 수정 섹션 시작 */}
            <textarea
              value={editingCommentContent}
              onChange={(e) => setEditingCommentContent(e.target.value)}
            ></textarea>
            <button
              className="edit_button"
              onClick={() => handleCommentUpdate(comment.id)}
            >
              저장
            </button>
            <button
              className="edit_button"
              onClick={() => setEditingCommentId(null)}
            >
              취소
            </button>
            {/* 댓글 수정 섹션 끌 */}
          </>
        ) : (
          <>
            {/* 댓글 읽기 섹션 시작 */}

            <div className="comment_content">{comment.content}</div>
            <div className="button_group">
              {/* 로그인 한 유저 본인이 쓴 댓글만 수정 삭제 가능 */}
              {user && comment.author?.username === user && (
                <>
                  <button
                    className="edit_button"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditingCommentContent(comment.content);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="delete_button"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
            {/* 댓글 일기 섹션 끝 */}
          </>
        )}
      </div>
    </div>
  );
};
export default CommentEdit;
