import React, { useCallback, useState, useEffect } from 'react';
import { PaginationProps, PaginationState } from './type';
import './Pagination.css';

export function Pagination({ pageSize, totalCount }: PaginationProps) {
    const [activePage, setActivePage] = useState<PaginationState['activePage']>(1);

    const totalPages = Math.ceil(totalCount / Number(pageSize));
    const numberBtnOnPage = 5;

    const handlePageChange = useCallback((pageNumber: number) => {
        setActivePage(pageNumber);
    }, []);

    useEffect(() => {
        setActivePage(1);
    }, [pageSize, totalCount]);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, activePage - Math.floor(numberBtnOnPage / 2));
        const endPage = Math.min(totalPages, startPage + numberBtnOnPage - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={i === activePage ? 'active-btn pagination-btn' : 'pagination-btn'}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pagination-wrapper">
            <button className="pagination-btn" onClick={() => handlePageChange(1)} disabled={activePage === 1}>
                First
            </button>

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(Math.max(1, activePage - 1))}
                disabled={activePage === 1}
            >
                <div className="prev-btn" />
            </button>

            {renderPageNumbers()}

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(Math.min(totalPages, activePage + 1))}
                disabled={activePage === totalPages}
            >
                <div className="next-btn" />
            </button>

            <button
                className="pagination-btn"
                onClick={() => handlePageChange(totalPages)}
                disabled={activePage === totalPages}
            >
                Last
            </button>
        </div>
    );
}
