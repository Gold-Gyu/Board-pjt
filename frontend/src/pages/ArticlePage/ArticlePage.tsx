import useMovePage from '@/hooks/useMovePage';
import '@/styles/Button.css';
import './ArticlePage.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Article } from '@/types/Article';
import instance from '@/apis/instance';
import { FaHeart } from 'react-icons/fa6';

const ArticlePage = () => {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/${params.spid}`);
        setArticle(response.data);
      } catch {
        console.log('error');
      }
    };
    if (params.spid) {
      fetchData();
    }
  }, [params.spid]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log(comment);
    setComment('');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log('좋아요');
  };

  const { goBack } = useMovePage();
  return (
    <div className="article-page-container">
      <div className="article-content">
        {article ? (
          <div>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span>작성자: {article.author}</span>
              <span>작성일: {article.publishDate}</span>
              <span>조회수: {article.views}</span>
              <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                <FaHeart /> {isLiked ? '좋아요 취소' : '좋아요'}
              </button>
            </div>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />

            <div className="comment-section" style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
              <h2 style={{ marginBottom: '20px' }}>댓글창</h2>
              <textarea
                className="comment-input"
                value={comment}
                onChange={handleCommentChange}
                placeholder="댓글을 작성하세요"
                style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', resize: 'none', backgroundColor: '#fff' }}
              />
              <button className="submit-button" onClick={handleCommentSubmit} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                댓글 작성
              </button>
              <div className="article-page" style={{ marginTop: '20px' }}>
                <button className="blue-button" onClick={() => goBack()} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#6c757d', color: '#fff', cursor: 'pointer' }}>
                  뒤로가기
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>해당 게시글은 존재하지 않습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
