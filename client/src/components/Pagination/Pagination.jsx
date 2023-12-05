import React from 'react';
import './Pagination.css'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 9;
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
      let startPage = Math.max(currentPage - halfVisiblePages, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
  
      return pageNumbers;
    };
  
    return (
      <div className="pagination-container">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        {generatePageNumbers().map((pageNumber) => (
          <button
            className={pageNumber === currentPage ? 'pages current-page' : 'pages'}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    );
  };
  
  export default Pagination;