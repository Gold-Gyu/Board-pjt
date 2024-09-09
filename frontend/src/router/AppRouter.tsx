import HomePage from '@/pages/Homepage/HomePage';
import MyPage from '@/pages/MyPage/MyPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import CreateArticlePage from '@/pages/CreateArticlePage/CreateArticlePage';
import NoticePage from '@/pages/NoticePage/NoticePage';
import QnAPage from '@/pages/QnAPage/QnAPage';
import FreeArticlePage from '@/pages/FreeArticlePage/FreeArticlePage';
import ArticlePage from '@/pages/ArticlePage/ArticlePage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';
import ProtectedRoute from '@/router/ProtectedRouter'; // ProtectedRoute 임포트

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 인증이 필요한 경로 */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-article"
          element={
            <ProtectedRoute>
              <CreateArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/free-article"
          element={
            <ProtectedRoute>
              <FreeArticlePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notice"
          element={
            <ProtectedRoute>
              <NoticePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qna-article"
          element={
            <ProtectedRoute>
              <QnAPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:spid"
          element={
            <ProtectedRoute>
              <ArticlePage />
            </ProtectedRoute>
          }
        />
        {/* 404 및 기타 에러 경로 처리 */}
        <Route path="*" element={<Navigate replace to="/error" />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
