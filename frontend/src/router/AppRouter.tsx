import HomePage from '@/pages/Homepage/HomePage';
import MyPage from '@/pages/MyPage/MyPage';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,

} from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import CreateArticlePage from '@/pages/CreateArticlePage/CreateArticlePage';
import NoticePage from '@/pages/NoticePage/NoticePage';
import QnAPage from '@/pages/QnAPage/QnAPage';
import FreeArticlePage from '@/pages/FreeArticlePage/FreeArticlePage';
import ArticlePage from '@/pages/ArticlePage/ArticlePage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import SignupPage from '@/pages/SignupPage/SignupPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Navigate replace to="/error" />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route path="/free-article" element={<FreeArticlePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/qna-article" element={<QnAPage />} />
        <Route path="/article/:spid" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
};
{
}
export default AppRouter;
