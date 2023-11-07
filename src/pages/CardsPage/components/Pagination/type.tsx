export interface PaginationProps {
    pageNumber: number;
    totalPages: number;
    onPageNumberChange: (value: string) => void;
}

export interface PaginationState {
    activePage: number;
    activeButtonNumber: Array<number>;
}
