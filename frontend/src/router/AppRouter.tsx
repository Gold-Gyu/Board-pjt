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
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
