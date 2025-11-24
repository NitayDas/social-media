// components/Feed/Feed.js
import React, { useState } from 'react';
import './Feed.css';
import Img1 from '../../assets/images/card_ppl1.png'
import Img2 from '../../assets/images/card_ppl2.png'
import Img3 from '../../assets/images/card_ppl3.png'
import Img4 from '../../assets/images/card_ppl4.png'

import profile1 from '../../assets/images/f1.png'
import profile2 from '../../assets/images/f2.png'
import profile3 from '../../assets/images/f3.png'
import profile4 from '../../assets/images/f4.png'
import profile5 from '../../assets/images/f5.png'
import profile6 from '../../assets/images/f6.png'
import profile7 from '../../assets/images/f7.png'
import CreatePost from './Posts/CreatePost';
import Post from './Posts/Post';


const Feed = () => {
  const [searchText, setSearchText] = useState('');

  // Mock data - replace with actual API data
  const stories = [
    { id: 1, name: 'Your Story', picture: Img1, isAdd: true },
    { id: 2, name: 'Steve Jobs', picture: Img2, hasNew: true },
    { id: 3, name: 'Ryan R.', picture: Img3, hasNew: true },
    { id: 4, name: 'Dylan Field', picture: Img4, hasNew: false },
  ];

  const exploreItems = [
    { name: 'Learning', icon: '📚' },
    { name: 'Insights', icon: '💡' },
    { name: 'Find friends', icon: '👥' },
    { name: 'Bookmarks', icon: '🔖' },
    { name: 'Group', icon: '👨‍👩‍👧‍👦' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Save post', icon: '💾' }
  ];

  const suggestedUsers = [
    {
      name: 'Readovan SkillArena',
      title: 'Founders & CEO at Trophy',
      avatar: '👨‍💼'
    }
  ];

  const friends = [
    { name: 'Steve Jobs', time: '5 minute ago', role: 'CEO of Apple', profile: profile1 },
    { name: 'Ryan Roslansky', role: 'CEO of Linkedin', profile: profile2 },
    { name: 'Dylan Field', profile: profile3 },
    { name: 'Martin Kuper', time: '5 minute ago', role: 'CEO of Amazon', profile: profile4 },
    { name: 'Kartm Salf', time: '5 minute ago', privacy: 'Public', profile: profile5 },
    { name: 'Bill gates', time: '5 minute ago', role: 'CEO of Apple', profile: profile6 },
    { name: 'Mark Zukarbarg', time: '5 minute ago', privacy: 'Public', profile: profile7 },
  ];


  const handlePostCreated = (newPost) => {
    // Add the new post to the posts list
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };


  return (
    <div className="feed-container mt-24">
      <div className="feed-layout">
        {/* Left Sidebar - Explore Section */}
        <div className="feed-sidebar left-sidebar">
          <div className="explore-section">
            <h3 className="section-title">Explore</h3>
            <div className="explore-list">
              {exploreItems.map((item, index) => (
                <div key={index} className="explore-item">
                  <span className="explore-icon">{item.icon}</span>
                  <span className="explore-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Feed */}
        <div className="feed-main">

          {/* Story Section */}
          <div className="story-section">
            <div className="stories-container">
              {stories.map((story) => (
                <div key={story.id} className="story-item">
                  <div className={`story-card ${story.isAdd ? 'add-story' : ''} ${story.hasNew ? 'has-new' : ''}`}>
                    {story.picture ? (
                      <div className="story-image-container">
                        <img src={story.picture} alt={story.name} className="story-image" />
                        <div className="story-name-overlay">
                          {story.name}
                        </div>
                      </div>
                    ) : (
                      <div className="story-image-container">
                        <span className="default-avatar">👤</span>
                        <div className="story-name-overlay">
                          {story.name}
                        </div>
                      </div>
                    )}
                    {story.isAdd && <div className="add-icon">+</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Posts */}
          <Post/>

        </div>
         

        {/* Right Sidebar - Suggestions & Friends */}
        <div className="feed-sidebar right-sidebar">
          {/* You Might Like Section */}
          <div className="suggestions-section">
            <h3 className="section-title">You Might Like</h3>
            {suggestedUsers.map((user, index) => (
              <div key={index} className="suggestion-card">
                <div className="suggestion-user">
                  <div className="user-avatar">{user.avatar}</div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-title">{user.title}</div>
                  </div>
                </div>
                <div className="suggestion-actions">
                  <button className="ignore-btn">Ignore</button>
                  <button className="follow-btn">Follow</button>
                </div>
              </div>
            ))}
          </div>

          {/* Your Friends Section */}
          <div className="friends-section">
            <div className="friends-header">
              <h3 className="section-title">Your Friends</h3>
              <button className="see-all-btn">See All</button>
            </div>
            
            {/* Search Input */}
            <div className="friends-search">
              <input 
                type="text" 
                placeholder="Input search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Friends List */}
            <div className="friends-list">
              {friends.map((friend, index) => (
                <div key={index} className="friend-card">
                  <div className="friend-user">
                     <img className="user-avatar" src={friend.profile} alt="profile" />
                    <div className="user-details">
                      <div className="user-name">{friend.name}</div>
                      {friend.role && <div className="user-role">{friend.role}</div>}
                      {friend.time && <div className="user-time">{friend.time}</div>}
                      {friend.privacy && <div className="user-privacy">{friend.privacy}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;