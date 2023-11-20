import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store/type';
import { setPageNumberValue } from '../../../../store/cardsReducer';
import './Pagination.css';

const numberBtnOnPage = 5;

export function Pagination() {
    const dispatch = useDispatch();

    const reduxPageSizeValue = useSelector((state: StoreState) => state.cards.pageSizeValue);
    const reduxPageNumberValue = useSelector((state: StoreState) => state.cards.pageNumberValue);
    const reduxCardsData = useSelector((state: StoreState) => state.cards.cardsData);
    const reduxIsDataLoaded = useSelector((state: StoreState) => state.cards.isDataLoaded);

    const pageNumber = Number(reduxPageNumberValue);
    const totalPages = Math.ceil(reduxCardsData.totalCount / Number(reduxPageSizeValue));

    const handlePageChange = useCallback(
        (pageNumber: number) => {
            dispatch(setPageNumberValue(String(pageNumber)));
        },
        [dispatch]
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

    if (reduxIsDataLoaded === false) {
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
