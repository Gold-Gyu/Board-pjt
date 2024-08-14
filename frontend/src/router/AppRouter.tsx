// import App from '@/App';
import HomePage from '@/pages/Homepage/HomePage';
import MyPage from '@/pages/MyPage/MyPage';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Router,
} from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import Navbar from '@/components/HomePageCompo/NavBar/Navbar';
import Sidebar from '@/components/HomePageCompo/SideBar/Sidebar';
import path from 'path';
import CreateArticlePage from '@/pages/CreateArticlePage/CreateArticlePage';
import NoticePage from '@/pages/NoticePage/NoticePage';
import QnAPage from '@/pages/QnAPage/QnAPage';
import FreeArticlePage from '@/pages/FreeArticlePage/FreeArticlePage';
import ArticlePage from '@/pages/ArticlePage/ArticlePage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="*" element={<Navigate replace to="/error" />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/create-article" element={<CreateArticlePage />} />
              <Route path="/free-article" element={<FreeArticlePage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/qna-article" element={<QnAPage />} />
              <Route path="/article/:spid" element={<ArticlePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
