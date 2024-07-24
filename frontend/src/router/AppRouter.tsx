// import App from '@/App';
import HomePage from '@/pages/HomePage';
import MyPage from '@/pages/MyPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Navigate replace to="/error" />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
