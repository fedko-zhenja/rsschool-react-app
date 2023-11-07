import React, { useCallback } from 'react';
import { PaginationProps } from './type';
import './Pagination.css';

const numberBtnOnPage = 5;

export function Pagination({ isDataLoaded, pageNumber, totalPages, onPageNumberChange }: PaginationProps) {
    const handlePageChange = useCallback(
        (pageNumber: number) => {
            onPageNumberChange(String(pageNumber));
        },
        [onPageNumberChange]
    );

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, pageNumber - Math.floor(numberBtnOnPage / 2));
        const endPage = Math.min(totalPages, startPage + numberBtnOnPage - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={i === pageNumber ? 'active-btn pagination-btn' : 'pagination-btn'}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    if (isDataLoaded === false) {
        return null;
    }

    return (
        <div className="pagination-wrapper">
            <button className="pagination-btn" onClick={() => handlePageChange(1)} disabled={pageNumber === 1}>
                First
            </button>

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
            >
                <div className="prev-btn" />
            </button>

            {renderPageNumbers()}

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(Math.min(totalPages, pageNumber + 1))}
                disabled={pageNumber === totalPages}
            >
                <div className="next-btn" />
            </button>

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(totalPages)}
                disabled={pageNumber === totalPages}
            >
                Last
            </button>
        </div>
    );
}
