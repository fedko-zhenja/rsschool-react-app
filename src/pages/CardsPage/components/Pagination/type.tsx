export interface PaginationProps {
    isDataLoaded: boolean;
    pageNumber: number;
    totalPages: number;
    onPageNumberChange: (value: string) => void;
}

export interface PaginationState {
    activePage: number;
    activeButtonNumber: Array<number>;
}
