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

  // const location = useLocation();
  // console.log(location);

  // const post = location.state;
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
            <div className="article-page">
              <button className="blue-button" onClick={() => goBack()}>
                뒤로가기
              </button>
            </div>
            <div className="table-container" style={{ marginTop: '30px' }}>
              <div>댓글창</div>
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
