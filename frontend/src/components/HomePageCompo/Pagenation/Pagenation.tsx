import React from 'react';
import '@/components/HomePageCompo/Pagenation/Pagenation.css';

interface PagenationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  maxPageNumbers?: number; // 추가된 prop
}

const Pagenation = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange, 
  maxPageNumbers = 5 // 기본값 설정
}: PagenationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(<span key="ellipsis-start">...</span>);
      pageNumbers.unshift(
        <button
          key={1}
          className={`page-number ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handleClick(1)}
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<span key="ellipsis-end">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          className={`page-number ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="page-button"
          onClick={() => handleClick(currentPage - 1)}
        >
          Prev
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button
          className="page-button"
          onClick={() => handleClick(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagenation;
