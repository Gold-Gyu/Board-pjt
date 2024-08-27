import React, { useState, useEffect } from 'react';
import '@/components/HomePageCompo/BoardIntro/BoardIntro.css';
import Pagenation from '../Pagenation/Pagenation';
import useMovePage from '@/hooks/useMovePage';
import instance from '@/apis/instance';
import { Article } from '@/types/Article';
import Navbar from '../NavBar/Navbar';
import Sidebar from '../SideBar/Sidebar';

const Board = ({ category }: { category: string }) => {
  const { movePage } = useMovePage();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [getArticleData, setGetArticleData] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 보여줄 게시글 수

  const clickArticleInfo = (post: Article) => {
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

  // 현재 페이지에 표시할 게시글 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getArticleData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="content">
          <div className="board">
            <div className="board-header-box">
              <h1>{category}</h1>
            </div>
            {currentItems.length > 0 ? (
              <div>
                <div className="article-count">
                  {getArticleData.length}개의 글
                </div>
                <div className="board-box">
                  <table className="board-table">
                    <thead>
                      <tr className="board-header">
                        <th className="board-header-item title-header">제목</th>
                        <th className="board-header-item author-header">
                          작성자
                        </th>
                        <th className="board-header-item date-header">
                          작성일
                        </th>
                        <th className="board-header-item views-header">조회</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((post: Article, index: number) => (
                        <tr
                          key={index}
                          className="board-row"
                          onClick={() => clickArticleInfo(post)}
                        >
                          <td className="board-header-item title">
                            <span className="title-text">
                              [{post.category}] {''}
                              {post.title.length > 20
                                ? `${post.title.substring(0, 15)}...`
                                : post.title}{' '}
                              {''}
                            </span>
                            <span>[{post.commentCount}]</span>
                          </td>
                          <td className="board-header-item author-header">
                            {post.author}
                          </td>
                          <td className="board-header-item date-header">
                            {post.publishDate}
                          </td>
                          <td className="board-header-item views-header">
                            {post.views}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagenation
                    totalItems={getArticleData.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            ) : (
              <div className="no-posts">게시글이 없습니다</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
