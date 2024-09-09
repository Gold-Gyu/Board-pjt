import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '@/apis/instance';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 세션이나 쿠키에 인증 정보가 있는지 확인
        const response = await instance.get('/check-auth', { withCredentials: true });
        if (response.status !== 200) {
          navigate('/login');  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        }
      } catch (error) {
        console.error('인증 확인 실패:', error);
        navigate('/login');  // 인증 확인 실패 시 로그인 페이지로 리다이렉트
      }
    };

    checkAuth();
  }, [navigate]);

  return children;  // 인증된 경우 자식 컴포넌트를 렌더링
};

export default ProtectedRoute;
