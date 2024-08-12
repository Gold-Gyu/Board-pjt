import React from 'react';
import './CreateArticleBoard.css';

const CreateArticleBoard = () => {
  return (
    <div>
      <h1>보드 생성 폼</h1>
      <div className="create-article-board">
        <div>게시글 셍상폼</div>
        <div className="create-article-button-box">
          <button>게시하기</button>
          <button>취소하기</button>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleBoard;
