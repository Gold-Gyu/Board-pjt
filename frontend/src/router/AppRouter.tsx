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
              <Route path="/create-article" element={<CreateArticlePage /> } />
              {/* <Route path="/article" element={<CreateArticlePage /> } /> */}

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
