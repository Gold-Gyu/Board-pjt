import React from 'react';
import '@/components/HomePageCompo/Board/Board.css';

const Board = () => {
  return (
    <div className="board">
      <div className="board-header-box">
        <h1>게시판</h1>
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="search-button">검색</button>
        </div>
      </div>
      <div>1000개의 글</div>
      <div className="board-box">
        <hr />
        <div>제목, 작성자, 작성일, 조회</div>
        <div className="board-box-ariticle">
          <div>게시판 분류</div>
          <div>주제</div>
          <div>작성자</div>
          <div>작성일</div>
          <div>조회</div>
          <hr />
        </div>
      </div>
      <div>페이지네이션</div>
      <div>검색</div>
    </div>
  );
};

export default Board;
