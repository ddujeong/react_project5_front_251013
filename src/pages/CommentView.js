import CommentEdit from "./CommentEdit";

const CommentView = ({ user, comments, loadComments }) => {
  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };

  return (
    <div>
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
            <CommentEdit user={user} loadComments={loadComments} comment={c} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CommentView;
