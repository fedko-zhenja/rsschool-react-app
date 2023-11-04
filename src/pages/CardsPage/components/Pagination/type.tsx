export interface PaginationProps {
    pageSize: string;
    totalCount: number;
}

export interface PaginationState {
    activePage: number;
    activeButtonNumber: Array<number>;
}
