// components/CreatePost/CreatePost.jsx
import React, { useState } from 'react';
import './Feed.css';

const CreatePost = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsPosting(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: postContent,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPostContent('');
        
        // Call the callback function to update parent component
        if (onPostCreated) {
          onPostCreated(newPost);
        }
        
        console.log('Post created successfully');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleOptionClick = (option) => {
    // Handle different post types
    console.log(`Selected option: ${option}`);
    // You can implement specific logic for each option here
    // For example, open file picker for photo/video, modal for event, etc.
  };

  return (
    <div className="create-post-section">
      <form onSubmit={handlePostSubmit}>
        <div className="your-story">
          <div className="story-avatar">👤</div>
          <div className="story-input">
            <input 
              type="text" 
              placeholder="Write something ..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="story-input-field"
              disabled={isPosting}
            />
          </div>
        </div>
        
        <div className="post-options">
          <button 
            type="button"
            className="post-option"
            onClick={() => handleOptionClick('photo')}
          >
            <span className="option-icon">🖼️</span>
            <span className="option-text">Photo</span>
          </button>
          <button 
            type="button"
            className="post-option"
            onClick={() => handleOptionClick('video')}
          >
            <span className="option-icon">🎥</span>
            <span className="option-text">Video</span>
          </button>
          <button 
            type="button"
            className="post-option"
            onClick={() => handleOptionClick('event')}
          >
            <span className="option-icon">📅</span>
            <span className="option-text">Event</span>
          </button>
          <button 
            type="button"
            className="post-option"
            onClick={() => handleOptionClick('article')}
          >
            <span className="option-icon">📄</span>
            <span className="option-text">Article</span>
          </button>
          <button 
            type="submit"
            className="post-option"
            disabled={isPosting || !postContent.trim()}
          >
            <span className="option-icon text-lg text-blue-700">🡽</span>
            <span className="option-text">
              {isPosting ? 'Posting...' : 'Post'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;