import React, { useState } from 'react';
import '@/components/HomePageCompo/BoardIntro/BoardIntro.css';
import Pagenation from '../Pagenation/Pagenation';
import useMovePage from '@/hooks/useMovePage';

const Board = ({ category }: { category: string }) => {
  const { movePage } = useMovePage();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const clickArticleInfo = (post: any) => {
    setSelectedPost(post);
    movePage(`/article/${post.id}`, post);
  };
  // 서버에 요청해서 데이터 받아오기
  const posts = [
    {
      id: 0,
      category: '필독',
      title: '게시판 이용 안내',
      content: 'test1',
      author: '관리자',
      date: '2023.07.19',
      views: '3.5만',
    },
    {
      id: 1,
      category: '공지',
      title: '새로운 기능 추가 안내',
      content: 'test2',
      author: 'LEO',
      date: '2021.07.29',
      views: '1.3만',
    },
    // 추가 게시물 데이터...
  ];
  return (
    <div className="board">
      <div className="board-header-box">
        <h1>{category}</h1>
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="search-button">검색</button>
        </div>
      </div>
      {posts.length > 0 ? (
        <div>
          <div className="article-count">{posts.length}개의 글</div>
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
                <div className="title" onClick={() => clickArticleInfo(post)}>
                  <span className="title-text">
                    [{post.category}]{' '}
                    {post.title.length > 20
                      ? `${post.title.substring(0, 15)}...`
                      : post.title}
                  </span>
                </div>
                <div className="board-header-item author-header">
                  {post.author}
                </div>
                <div className="board-header-item date-header">{post.date}</div>
                <div className="board-header-item views-header">
                  {post.views}
                </div>
              </div>
            ))}
            <hr />
            <Pagenation />
          </div>
        </div>
      ) : (
        <div className="no-posts">게시글이 없습니다</div>
      )}

      {/* {selectedPost && (
        <div className="selected-post-info">
          <h2>선택된 게시글 정보</h2>
          <p>
            <strong>ID:</strong> {selectedPost.id}
          </p>
          <p>
            <strong>제목:</strong> {selectedPost.title}
          </p>
          <p>
            <strong>작성자:</strong> {selectedPost.author}
          </p>
          <p>
            <strong>작성일:</strong> {selectedPost.date}
          </p>
          <p>
            <strong>조회수:</strong> {selectedPost.views}
          </p>
          <p>
            <strong>내용:</strong> {selectedPost.content}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Board;
