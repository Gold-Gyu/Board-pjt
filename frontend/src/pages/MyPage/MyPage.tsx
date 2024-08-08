import MypageInfo from '@/components/MypageCompo/Info/MypageInfo';
import MyProfile from '@/components/MypageCompo/MyProfile/MyProfile';
import './MyPage.css';
import React from 'react';

const MyPage = () => {
  return (
    <div>
      <div className="MyPage-box">
        <MyProfile
          isLoggedIn={true}
          username={'데클란 라이스'}
          signupDate={'2019-05-23'}
          rated={'매니저'}
          introduce={'아스날 팬 여기 여기 붙어라잉'}
          profileImage="/src/assets/react.svg"
        />
        <MypageInfo />
      </div>
    </div>
  );
};

export default MyPage;
