import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="latest-posts">
        <h2>Latest Posts</h2>
        <div className="table-container">
          {/* 게시글 목록 렌더링 */}
        </div>
      </section>
      {/* <section className="popular-posts">
        <h2>Popular Posts</h2>
        <div className="table-container">
          
        </div>
      </section>
      <section className="announcements">
        <h2>Announcements</h2>
        <div className="table-container">
      
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
