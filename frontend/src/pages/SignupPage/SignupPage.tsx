import React, { useState } from 'react';
import './SignupPage.css';
import useMovePage from '@/hooks/useMovePage';

const SignupPage = () => {
  const { movePage } = useMovePage();
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentVerificationCode, setSentVerificationCode] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleSendVerificationCode = () => {
    // 이메일 형식 확인
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
      return;
    }
    setEmailError(null);

    const code = '123456';
    setSentVerificationCode(code);
    alert('인증번호가 발송되었습니다.');
  };

  const handleVerifyCode = () => {
    if (verificationCode === sentVerificationCode) {
      setIsEmailVerified(true);
      alert('이메일이 인증되었습니다.');
    } else {
      setIsEmailVerified(false);
      alert('인증번호가 틀렸습니다.');
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setIsPasswordMatch(value === password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailVerified && isPasswordMatch) {
      console.log('회원가입 요청:', {
        email,
        nickname,
        password,
      });
      movePage('/home', null);
    } else {
      alert('모든 필드를 올바르게 입력해주세요.');
      console.log('입력 조건 불충족');
      
    }
  };

  return (
    <div className="signup-layout-box">
      <div className="signup-outer-box">
        <div className="signup-box">
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group email-group">
              <label htmlFor="email">이메일</label>
              <div className="email-input-group">
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button type="button" onClick={handleSendVerificationCode}>
                  인증하기
                </button>
              </div>
              {emailError && <div className="error-message">{emailError}</div>}
              {isEmailVerified && (
                <div className="success-message">
                  <span className="checkmark">✔</span> 인증되었습니다.
                </div>
              )}
              {isEmailVerified === false && (
                <div className="error-message">인증번호가 틀렸습니다.</div>
              )}
            </div>
            <div className="form-group verification-group">
              <label htmlFor="verificationCode">인증번호</label>
              <div className="verification-input-group">
                <input
                  type="text"
                  id="verificationCode"
                  placeholder="인증번호를 입력하세요"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                />
                <button type="button" onClick={handleVerifyCode}>
                  인증확인
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={handleNicknameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                required
                className={
                  isPasswordMatch === null
                    ? ''
                    : isPasswordMatch
                    ? 'password-match'
                    : 'password-mismatch'
                }
              />
              {isPasswordMatch === false && (
                <div className="error-message">비밀번호가 일치하지 않습니다.</div>
              )}
              {isPasswordMatch && (
                <div className="success-message">
                  <span className="checkmark">✔</span> 비밀번호가 일치합니다.
                </div>
              )}
            </div>
            <button type="submit" disabled={!isEmailVerified || !isPasswordMatch}>
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
