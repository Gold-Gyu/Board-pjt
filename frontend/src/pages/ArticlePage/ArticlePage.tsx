import useMovePage from '@/hooks/useMovePage';
import '@/styles/Button.css';
import './ArticlePage.css';
import { useLocation } from 'react-router-dom';

const ArticlePage = () => {
  const location = useLocation();
  const post = location.state;
  const { goBack } = useMovePage();
  return (
    <div>
      <div className="table-container">
        {post && (
          <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>작성자: {post.author}</p>
            <p>작성일: {post.date}</p>
            <p>조회수: {post.views}</p>
          </div>
        )}

        <div className="article-page">
          <button className="blue-button" onClick={() => goBack()}>
            뒤로가기
          </button>
        </div>
      </div>
      <div className="table-container" style={{ marginTop: '30px' }}>
        <div>게시글 목록 5개정도 보여주기</div>
      </div>
    </div>
  );
};

export default ArticlePage;
