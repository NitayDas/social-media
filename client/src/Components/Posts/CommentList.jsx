// components/Feed/Posts/CommentList.jsx
import React from 'react';
import LikeButton from './LikeButton';

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list mt-2">
      {comments.map(comment => (
        <div key={comment.id} className="comment-card">
          <div className="comment-author">{comment.author}</div>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-actions">
            <LikeButton comment={comment} />
          </div>

          {/* Render nested replies recursively */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="comment-replies">
              <CommentList comments={comment.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
