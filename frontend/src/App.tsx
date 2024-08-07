import Sidebar from './components/HomePageCompo/SideBar/Sidebar';
import Navbar from './components/HomePageCompo/NavBar/Navbar';
import AppRouter from './router/AppRouter';
import './styles/App.css';

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <AppRouter />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
