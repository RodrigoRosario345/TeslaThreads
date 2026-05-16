import { generatePageNumbers } from "@/helpers";
import { UsePaginationParams, UsePaginationReturn } from "@/interfaces";
import { useCallback, useMemo } from "react";

export function usePagination({
    totalPages,
    currentPage,
    maxVisiblePages = 7,
    baseUrl = "",
}: UsePaginationParams): UsePaginationReturn {
    const safeTotalPages = Math.max(1, totalPages);
    const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

    const isFirstPage = safeCurrentPage === 1;
    const isLastPage = safeCurrentPage === safeTotalPages;
    const hasPreviousPage = !isFirstPage;
    const hasNextPage = !isLastPage;
    const previousPage = hasPreviousPage ? safeCurrentPage - 1 : null;
    const nextPage = hasNextPage ? safeCurrentPage + 1 : null;

    const items = useMemo(
        () => generatePageNumbers(safeTotalPages, safeCurrentPage, maxVisiblePages),
        [safeTotalPages, safeCurrentPage, maxVisiblePages],
    );

    const getPageUrl = useCallback(
        (page: number) => {
            const separator = baseUrl.includes("?") ? "&" : "?";
            return `${baseUrl || ""}${separator}page=${page}`;
        },
        [baseUrl],
    );

    const isCurrentPage = useCallback(
        (page: number) => page === safeCurrentPage,
        [safeCurrentPage],
    );

    const canGoToPage = useCallback(
        (page: number) => page >= 1 && page <= safeTotalPages,
        [safeTotalPages],
    );

    return {
        items,
        isFirstPage,
        isLastPage,
        hasPreviousPage,
        hasNextPage,
        previousPage,
        nextPage,
        getPageUrl,
        isCurrentPage,
        canGoToPage,
    };
}
