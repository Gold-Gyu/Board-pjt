import React from 'react';
import '@/components/HomePageCompo/Pagenation/Pagenation.css';

interface PagenationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagenation: React.FC<PagenationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
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
