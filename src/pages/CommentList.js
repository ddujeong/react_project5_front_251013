import CommentView from "./CommentView";

const CommentList = ({ id, user, loadComments, comments }) => {
  return (
    <div>
      <CommentView
        id={id}
        user={user}
        loadComments={loadComments}
        comments={comments}
      />
    </div>
  );
};
export default CommentList;
