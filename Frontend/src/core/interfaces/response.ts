export interface Pagination {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number;
    previousPage: number;
}

export interface ResponseData<T> {
    data: T;
    pagination: Pagination;
}
