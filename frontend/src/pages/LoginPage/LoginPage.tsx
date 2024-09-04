import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import Button from '@/components/Button/Button';
import useMovePage from '@/hooks/useMovePage';
import instance from '@/apis/instance';

const LoginPage = () => {
  const { movePage } = useMovePage();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };
  const moveToSignupPage = () => {
    movePage('/signup', null);
  };

  const sendLoginInfo = () => {
    const fetchData = async () => {
      try {
        const response = await instance.post('/login');
        console.log(response);
      } catch {
        console.log('error');
      }
    };
    fetchData();
    console.log(userEmail);
    console.log(userPassword);
  };

  return (
    <div className="login-layout-box">
      <div className="login-outer-box">
        <div className="login-box">
          <div className="login-letter">
            <h1>LOGIN</h1>
          </div>
          <div className="login-info-box">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                onChange={handlePwChange}
              />
            </div>
          </div>
        </div>
        <div className="login-btn-box">
          <Button buttonName="로그인" onClick={sendLoginInfo} />
          <Button buttonName="회원가입" onClick={moveToSignupPage} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
