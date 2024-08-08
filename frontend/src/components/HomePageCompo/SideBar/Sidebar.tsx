import React from 'react';
import './Sidebar.css';
import Profile from '../Profile/Profile';



const Sidebar = () => {
  const isLoggedIn = true; // 예시로 로그인 여부를 true로 설정
  const username = 'John Doe'; // 예시 사용자 이름
  const profileImage = '/src/assets/react.svg';
  const rated = '매니저';
  const signupDate = '2024-07-30';
  const introduce = 'Good Morning';

  return (
    <aside className="sidebar">
      <div className="info-container">
        <div>
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
          <div className='user-info-flame'>
            <div>등급</div>
            <div>{rated}</div>
          </div>
          <div className='user-info-flame'>
            <div>방문회수</div>
            <div>5회</div>
          </div>
          <div className='user-info-flame'>
            <div>게시글 작성수</div>
            <div>10개</div>
          </div>
          <div className='user-info-flame'>
            <div>댓글 수</div>
            <div>20개</div>
          </div>
        </div>
        <div className="cafe-button">
          <div className="cafe-post">게시판 글쓰기</div>
          <div className="cafe-chat">게시판 채팅</div>
        </div>
        <nav>
          <ul>
            <li>즐겨찾는 게시판</li>
            <li>전체글보기</li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
