import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import LikeButton from './LikeButton';
import profile from '../../assets/images/f2.png';
import '../../Pages/NewsFeed/Feed.css';
import AxiosInstance from '../AxiosInstance';

const PostCard = ({ post }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]); 
  const [latestComment, setLatestComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);

  // Fetch latest comment on mount
  useEffect(() => {
    const fetchLatestComment = async () => {
      try {
        const response = await AxiosInstance.get(`comments/?post=${post.id}`);
        if (response.data.results && response.data.results.length > 0) {
          setLatestComment(response.data.results[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchLatestComment();
  }, [post.id]);

  // Fetch all comments when opening
  const toggleComments = async () => {
    setCommentsVisible(!commentsVisible);
    if (!commentsVisible && comments.length === 0) {
      try {
        const response = await AxiosInstance.get(`comments/?post=${post.id}`);
        setComments(response.data.results || []);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await AxiosInstance.post('comments/', {
        post: post.id,
        content: newComment,
      });
      setLatestComment(response.data); // show new comment immediately
      setComments(prev => [...prev, response.data]);
      setCommentsCount(prev => prev + 1);
      setNewComment('');
      if (!commentsVisible) setCommentsVisible(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-user">
          <img src={profile} className="user-avatar" alt="Profile" />
          <div className="user-info">
            <div className="user-name">{post.author}</div>
            <div className="post-time">{new Date(post.created_at).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p className="text-black text-lg">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      {/* Post Actions */}
      <div className="post-options mt-1">
        <LikeButton post={post} />
        <button className="text-base" onClick={toggleComments}>
          💬 Comments ({commentsCount})
        </button>
      </div>

       {/* Latest Comment */}
      {latestComment && !commentsVisible && (
        <div className="comment-card mt-2">
            <div className="comment-author">{latestComment.author}</div>
            <div className="comment-content">{latestComment.content}</div>
            <div className="comment-actions">
              <LikeButton comment={latestComment} />
            </div>
        </div>
      )}


      {/* Comment Input */}
    {commentsVisible && (
      <div className="comment-input-section mt-2 flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post
        </button>
        </div>
       )}

      {/* Nested Comments */}
      {commentsVisible && comments.length > 0 && (
        <CommentList comments={comments} />
      )}
    </div>
  );
};

export default PostCard;
