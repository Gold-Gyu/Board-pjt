import React, { useState } from 'react';
import './MypageInfo.css';

const MypageInfo = () => {
  const [activeTab, setActiveTab] = useState('article');

  const ClickArticle = () => {
    setActiveTab('article');
  };

  const ClickComment = () => {
    setActiveTab('comment');
  };

  const ClickCommentArticle = () => {
    setActiveTab('commentArticle');
  };

  const ClickLikeArticle = () => {
    setActiveTab('likeArticle');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'article':
        return <div>작성글 내용</div>;
      case 'comment':
        return <div>작성댓글 내용</div>;
      case 'commentArticle':
        return <div>댓글단 글 내용</div>;
      case 'likeArticle':
        return <div>좋아요한 글 내용</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mypage-info-box">
      <div className="mypage-part">
        <div
          className={`tab ${activeTab === 'article' ? 'active' : ''}`}
          onClick={ClickArticle}
        >
          작성글
        </div>
        <div
          className={`tab ${activeTab === 'comment' ? 'active' : ''}`}
          onClick={ClickComment}
        >
          작성댓글
        </div>
        <div
          className={`tab ${activeTab === 'commentArticle' ? 'active' : ''}`}
          onClick={ClickCommentArticle}
        >
          댓글단 글
        </div>
        <div
          className={`tab ${activeTab === 'likeArticle' ? 'active' : ''}`}
          onClick={ClickLikeArticle}
        >
          좋아요한 글
        </div>
      </div>
      <div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default MypageInfo;
