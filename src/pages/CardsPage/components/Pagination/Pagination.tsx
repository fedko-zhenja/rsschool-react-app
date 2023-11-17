import { useCallback } from 'react';
import { useCardsContext } from '../../../../context/context';
import './Pagination.css';

const numberBtnOnPage = 5;

export function Pagination() {
    const context = useCardsContext();
    const isDataLoaded = context ? context.isDataLoaded : false;

    const pageNumberValue = context ? context.pageNumberValue : '1';

    const cardsData = context
        ? context.cardsData
        : {
              data: [],
              page: 0,
              pageSize: 0,
              count: 0,
              totalCount: 0,
          };

    const pageSizeValue = context ? context.pageSizeValue : '4';

    const setPageNumberValue = context ? context.setPageNumberValue : () => {};

    const pageNumber = Number(pageNumberValue);
    const totalPages = Math.ceil(cardsData.totalCount / Number(pageSizeValue));

    const handlePageChange = useCallback(
        (pageNumber: number) => {
            setPageNumberValue(String(pageNumber));
        },
        [setPageNumberValue]
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
                    data-testid="pagination-btn"
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
