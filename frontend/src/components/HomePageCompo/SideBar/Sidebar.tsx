import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import Profile from '../Profile/Profile';
import useMovePage from '@/hooks/useMovePage';
import instance from '@/apis/instance';
import { Article } from '@/types/Article';

const Sidebar = () => {
  const isLoggedIn = true; // 예시로 로그인 여부를 true로 설정
  const username = 'John Doe'; // 예시 사용자 이름
  const profileImage = '/src/assets/react.svg';
  const rated = '매니저';
  const signupDate = '2024-07-30';
  const introduce = 'Good Morning';
  const [showModal, setShowModal] = useState(false);

  // 서버 데이터 받아오기
  

  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmCancel = () => {
    console.log('확인합니다.');
    setShowModal(false);
    movePage('/home', 'QUESTION_BOARD');
  };
  const { movePage } = useMovePage();
  return (
    <aside className="sidebar">
      <div className="info-container">
        <div
          onClick={() => {
            movePage('/mypage', null);
          }}
        >
          <hr />
          <Profile
            isLoggedIn={isLoggedIn}
            username={username}
            profileImage={profileImage}
            rated={rated}
            signupDate={signupDate}
            introduce={introduce}
          />
          <hr />
        </div>
        {/* 회원이 활동한 정보 모듈화 하기! */}
        <div className="user-info">
          <div className="user-info-flame">
            <div>등급</div>
            <div>{rated}</div>
          </div>
          <div className="user-info-flame">
            <div>방문회수</div>
            <div>5회</div>
          </div>
          <div className="user-info-flame">
            <div>게시글 작성수</div>
            <div>10개</div>
          </div>
          <div className="user-info-flame">
            <div>댓글 수</div>
            <div>20개</div>
          </div>
        </div>
        <div className="cafe-button">
          <div
            className="cafe-post"
            onClick={() => movePage('/create-article', 'QUESTION_BOARD')}
          >
            게시판 글쓰기
          </div>
          <div className="cafe-chat" onClick={handleCancelClick}>게시판 채팅</div>
        </div>
        <nav>
          <ul>
            <li onClick={() => movePage('/home', null)}>전체 게시판</li>
            <li onClick={() => movePage('/notice', 'NOTICE')}>공지사항</li>
            <li onClick={() => movePage('/free-article', 'FREE_BOARD')}>자유게시판</li>
            <li onClick={() => movePage('/qna-article', 'QUESTION_BOARD')}>질문게시판</li>
          </ul>
        </nav>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>서비스 준비중입니다.</p>
            <button onClick={handleConfirmCancel}>확인</button>
            
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
