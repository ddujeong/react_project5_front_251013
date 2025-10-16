import { useNavigate, useParams } from "react-router-dom";
import "./BoardDetail.css";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
const BoardDetail = ({ user }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // 해당글 id로 요청한 글 객체
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams(); // board/:id id 파라미터 받아오기

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const loadPost = async () => {
    // 특정 글 id로 글 1개 요청하기
    try {
      setLoading(true);
      const res = await api.get(`/api/board/${id}`);
      setPost(res.data); //특정 글 id 객체를 state에 등록
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error(err);
      setError("해당 게시글은 존재하지 않습니다.");
      // alert("해당 게시글은 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/board/${id}`);
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
  const handleUpdate = async () => {
    if (!window.confirm("정말 수정하시겠습니까?")) {
      return;
    }
    try {
      const res = await api.put(`/api/board/${id}`, { title, content });
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
  const loadComments = async () => {
    // 특정 글 id로 댓글 목록 요청하기
    try {
      setLoading(true);
      const res = await api.get(`/api/comment/${id}`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("해당 댓글은 존재하지 않습니다.");
      // alert("해당 게시글은 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요");
      return;
    }
    if (!user) {
      alert("로그인 후 댓글 작성 가능합니다.");
      navigate("/login");
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
  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };

  if (loading) return <p>게시글 로딩 중....</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post)
    return <p sytle={{ color: "blue" }}>해당 게시글이 존재하지 않습니다.</p>;
  const isAuthor = user && user === post.author.username;
  return (
    <div className="detail_container">
      {editing ? (
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
      ) : (
        <>
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
                <button
                  className="edit_button"
                  onClick={() => setEditing(true)}
                >
                  수정
                </button>
                <button className="delete_button" onClick={handleDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        </>
      )}
      {/* 댓글 섹션 시작  */}
      <div className="comment_section">
        <h4>댓글 작성</h4>
        <form onSubmit={handleComment} className="comment_form">
          <textarea
            placeholder="댓글을 작성해주세요..."
            disabled={user !== null}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit" className="comment_button">
            작성
          </button>
        </form>
        <ul className="comment_list">
          {comments.length === 0 && (
            <p>
              아직 등록된 댓글이 없습니다.<br></br>댓글을 작성해주세요!
            </p>
          )}
          {comments.map((c) => (
            <li key={c.id} className="comment_item">
              <div className="comment_header">
                <span className="comment_author">
                  작성자 : {c.author.username}{" "}
                </span>
                <span className="comment_date">
                  작성일 :{formatDate(c.createdate)}
                </span>
              </div>
              <div className="comment_edit_section">
                {editingCommentId === c.id ? (
                  <>
                    {/* 댓글 수정 섹션 시작 */}
                    <textarea
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                    ></textarea>
                    <button
                      className="edit_button"
                      onClick={() => handleCommentUpdate(c.id)}
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
                    <div className="comment_content">{c.content}</div>
                    <div className="button_group">
                      {/* 로그인 한 유저 본인이 쓴 댓글만 수정 삭제 가능 */}
                      {user && c.author.username === user && (
                        <>
                          <button
                            className="edit_button"
                            onClick={() => {
                              setEditingCommentId(c.id);
                              setEditingCommentContent(c.content);
                            }}
                          >
                            수정
                          </button>
                          <button
                            className="delete_button"
                            onClick={() => handleCommentDelete(c.id)}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BoardDetail;
