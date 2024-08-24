import React, { useState, useEffect } from 'react';
import '@/components/HomePageCompo/BoardIntro/BoardIntro.css';
import Pagenation from '../Pagenation/Pagenation';
import useMovePage from '@/hooks/useMovePage';
import instance from '@/apis/instance';
import { Article } from '@/types/Article';

const Board = ({ category }: { category: string }) => {
  const { movePage } = useMovePage();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [getArticleData, setGetArticleData] = useState<any>([]);
  const clickArticleInfo = (post: Article) => {
    console.log(post.boardId);
    console.log(post);
    

    setSelectedPost(post);
    movePage(`/article/${post.boardId}`, post);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('');
        setGetArticleData(response.data);
        console.log(response.data);
      } catch {
        console.log('실패');
      }
    };
    fetchData();
  }, []);


  return (
    <div className="board">
      <div className="board-header-box">
        <h1>{category}</h1>
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="search-button">검색</button>
        </div>
      </div>
      {getArticleData.length > 0 ? (
        <div>
          <div className="article-count">{getArticleData.length}개의 글</div>
          <div className="board-box">
            <hr />
            <div className="board-header">
              <div className="board-header-item title-header">제목</div>
              <div className="board-header-item author-header">작성자</div>
              <div className="board-header-item date-header">작성일</div>
              <div className="board-header-item views-header">조회</div>
            </div>
            {/* <div className="board-box-ariticle"> */}
            {getArticleData.map((post: Article, index: number) => (
              <div key={index} className="board-row">
                <div className="title">
                  <span
                    className="title-text"
                    onClick={() => clickArticleInfo(post)}
                  >
                    [{post.category}] {''}
                    {post.title.length > 20
                      ? `${post.title.substring(0, 15)}...`
                      : post.title}{' '}
                    {''}[{post.commentCount}]
                  </span>
                </div>
                <div className="board-header-item author-header">
                  {post.author}
                </div>
                <div className="board-header-item date-header">
                  {post.publishDate}
                </div>
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

    </div>
  );
};

export default Board;
