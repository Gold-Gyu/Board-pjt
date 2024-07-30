import { useState, useEffect } from 'react';
import './HomePageContext.scss';

function HomePageContext() {
  return (
    <div>
      <div className="content-box">
        <div className="left-content">
          <h1>게시글 폴더</h1>
        </div>
        <div className="right-content">
          <h1>게시글 목록</h1>
          
        </div>
      </div>
    </div>
  );
}

export default HomePageContext;
