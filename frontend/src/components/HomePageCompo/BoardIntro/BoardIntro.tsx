import React from 'react';
import '@/components/HomePageCompo/BoardIntro/BoardIntro.css';
import Pagenation from '../Pagenation/Pagenation';

const Board = () => {
  const posts = [
    {
      category: '필독',
      title: '[필독] 게시판 이용 안내',
      author: '관리자',
      date: '2023.07.19',
      views: '3.5만',
    },
    {
      category: '공지',
      title: '[공지사항] 새로운 기능 추가 안내',
      author: 'LEO',
      date: '2021.07.29',
      views: '1.3만',
    },
    // 추가 게시물 데이터...
  ];
  return (
    <div className="board">
      <div className="board-header-box">
        <h1>게시판</h1>
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="search-button">검색</button>
        </div>
      </div>
      <div className="article-count">1000개의 글</div>
      <div className="board-box">
        <hr />
        <div className="board-header">
          <div className="board-header-item title-header">제목</div>
          <div className="board-header-item author-header">작성자</div>
          <div className="board-header-item date-header">작성일</div>
          <div className="board-header-item views-header">조회</div>
        </div>
        {/* <div className="board-box-ariticle"> */}
        {posts.map((post, index) => (
          <div key={index} className="board-row">
            <div className="title">
              {post.category}{' '}
              {post.title.length > 20
                ? `${post.title.substring(0, 15)}...`
                : post.title}
            </div>
            <div>댓글수</div>
            <div className="board-header-item author-header">{post.author}</div>
            <div className="board-header-item date-header">{post.date}</div>
            <div className="board-header-item views-header">{post.views}</div>
          </div>
        ))}
        <hr />
        <Pagenation />
      </div>
      <div>페이지네이션</div>
      <div>검색</div>
    </div>
  );
};

export default Board;
