export interface UsePaginationParams {
    totalPages: number;
    currentPage: number;
    maxVisiblePages?: number;
    baseUrl?: string;
}

export interface PaginationItem {
    type: "page" | "ellipsis";
    value: number | string;
}

export interface UsePaginationReturn {
    items: PaginationItem[];
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    // previous page number (null if it's the first page)   
    previousPage: number | null;
    // next page number (null if it's the last page)
    nextPage: number | null;
    /** generate URL for a given page number */
    getPageUrl: (page: number) => string;
    isCurrentPage: (page: number) => boolean;
    // check if a page number is valid (between 1 and totalPages)
    canGoToPage: (page: number) => boolean;
}