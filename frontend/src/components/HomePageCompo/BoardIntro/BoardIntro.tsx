import React, { useState, useEffect } from 'react';
import '@/components/HomePageCompo/BoardIntro/BoardIntro.css';
import Pagenation from '../Pagenation/Pagenation';
import useMovePage from '@/hooks/useMovePage';
import instance from '@/apis/instance';
import { Article } from '@/types/Article';
import Navbar from '../NavBar/Navbar';
import Sidebar from '../SideBar/Sidebar';
import { useLocation } from 'react-router-dom';

const BoardIntro = ({ category }: { category: string}) => {
  const location = useLocation();
  const { movePage } = useMovePage();
  const [selectedPost, setSelectedPost] = useState<any>(location.state || null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 보여줄 게시글 수
  
  const clickArticleInfo = (post: Article) => {
    setSelectedPost(post);
    movePage(`/article/${post.boardId}`, post);
  };
  const [getArticleData, setGetArticleData] = useState<Article[]>([]);
  const [getData, setGetData] = useState('');
  const [getNoticeData, setGetNoticeData] = useState<Article[]>([]);
  const [getFreeBoardData, setGetFreeBoardData] = useState<Article[]>([]);
  const [getQuestuonData, setGetQuestionData] = useState<Article[]>([]);
  const [displayData, setDisplayData] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('');
        setGetArticleData(response.data);
        
        // NOTICE 카테고리 필터링
        const noticeData = response.data.filter((article: Article) => article.category === 'NOTICE');
        setGetNoticeData(noticeData);

        const freeBoardData = response.data.filter((article: Article) => article.category === 'FREE_BOARD');
        setGetFreeBoardData(freeBoardData);

        const questionData = response.data.filter((article: Article) => article.category === 'QUESTION_BOARD')
        setGetQuestionData(questionData);
        
        console.log(response);
      } catch {
        console.log('실패');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (location.state) {
      setGetData(location.state);
      console.log(location.state);
      
    }
  }, [location]);

  useEffect(() => {
    if (getData === 'NOTICE') {
      setDisplayData(getNoticeData);
    } else if (getData === 'FREE_BOARD') {
      setDisplayData(getFreeBoardData);
    } else if (getData === 'QUESTION_BOARD') {
      setDisplayData(getQuestuonData);
    } else {
      setDisplayData(getArticleData);
    }
  }, [getData, getNoticeData, getFreeBoardData, getQuestuonData, getArticleData]);

  // 현재 페이지에 표시할 게시글 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(displayData.length / itemsPerPage);

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
            {displayData.length > 0 ? (
              <div>
                <div className="article-count">
                  {displayData.length}개의 글
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
                    totalItems={displayData.length}
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

export default BoardIntro;
