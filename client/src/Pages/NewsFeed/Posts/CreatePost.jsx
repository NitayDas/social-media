import React, { useState, useRef } from 'react';
import '../Feed.css';
import profile2 from '../../../assets/images/f2.png'
import AxiosInstance from '../../../Components/AxiosInstance';


const CreatePost = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const fileInputRef = useRef(null);

  const handlePostSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!postContent.trim() && !selectedImage) return;

    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append('content', postContent);
      formData.append('timestamp', new Date().toISOString());
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await AxiosInstance.post('posts/',formData);

      if (response.ok) {
        const newPost = await response.json();
        setPostContent('');
        setSelectedImage(null);
        if (onPostCreated) onPostCreated(newPost);
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
    if (option === 'photo') {
      // Open file picker for photo
      fileInputRef.current.click();
    } else {
      console.log(`Selected option: ${option}`);
      handlePostSubmit();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="create-post-section">
      <form onSubmit={handlePostSubmit}>
        <div className="your-story">
          <img src={profile2} className="story-avatar" alt="" />
          <div className="story-input">
            <textarea
              type="text"
              placeholder="Write something ..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="story-input-field"
              disabled={isPosting}
            />
          </div>
        </div>

        {selectedImage && (
          <div className="selected-image-preview">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-md mt-2"
            />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />

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
            disabled={isPosting || (!postContent.trim() && !selectedImage)}
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
