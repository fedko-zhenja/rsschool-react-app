export interface PaginationProps {
    pageSize: string;
    totalCount: number;
    onPageNumberChange: (value: string) => void;
}

export interface PaginationState {
    activePage: number;
    activeButtonNumber: Array<number>;
}
