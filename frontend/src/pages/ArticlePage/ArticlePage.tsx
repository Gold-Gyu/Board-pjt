import useMovePage from '@/hooks/useMovePage';
import '@/styles/Button.css';
import './ArticlePage.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Article } from '@/types/Article';
import instance from '@/apis/instance';

const ArticlePage = () => {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState('');

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

  const { goBack } = useMovePage();
  return (
    <div>
      <div className="table-container">
        {article ? (
          <div>
            <div>
              <h1>{article.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
              <p>작성자: {article.author}</p>
              <p>작성일: {article.publishDate}</p>
              <p>조회수: {article.views}</p>
            </div>

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
