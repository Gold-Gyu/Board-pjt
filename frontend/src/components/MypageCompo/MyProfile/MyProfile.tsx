import React from 'react';
import '@/components/MypageCompo/MyProfile/MyProfile.css';

interface ProfileProps {
  isLoggedIn: boolean;
  username: string;
  profileImage?: string;
  signupDate: string;
  rated: string;
  introduce: string;
}

const MyProfile: React.FC<ProfileProps> = ({
  isLoggedIn,
  username,
  profileImage,
  rated,
  introduce,
  signupDate,
}) => {
  return (
    <div className="backround-box">
      <div className="profile-box">
        {isLoggedIn ? (
          <div>
            <div className="logged-in-box">
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image-box"
              />
              <div className="info-box">
                <div className="username-rated-box">
                  <div className="username-box">{username}</div>
                  <div className="rated">{rated}</div>
                </div>
                <div className="signup-date-dox">{signupDate}</div>
                <div className="introduce-box">{introduce}</div>
              </div>
            </div>
          </div>
        ) : (
          <a href="/login" className="login-link">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
