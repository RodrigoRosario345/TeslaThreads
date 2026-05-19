import { PaginationItem } from "@/interfaces";

/**
 * Generate a list of pagination items (pages and ellipsis) based on total pages, current page and max visible pages.
 *
 * Pattern example (maxVisiblePages=7, totalPages=20):
 * - Page 1:   [1, 2, 3, 4, 5, '…', 20]
 * - Page 10:  [1, '…', 8, 9, 10, 11, 12, '…', 20]
 * - Page 19:  [1, '…', 16, 17, 18, 19, 20]
 */
export function generatePageNumbers(
    totalPages: number,
    currentPage: number,
    maxVisible: number,
): PaginationItem[] {
    // If all pages fit, show them without ellipsis
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => ({
            type: "page" as const,
            value: i + 1,
        }));
    }

    const items: PaginationItem[] = [];

    // Always show the first page
    items.push({ type: "page", value: 1 });

    // Calculate the sliding window around currentPage.
    // Reserve 3 fixed slots: [first, …, last].
    // The remaining slots are distributed on both sides of currentPage.
    const siblingSlots = maxVisible - 3; // -first, -last, -at least one ellipsis
    const half = Math.floor(siblingSlots / 2);

    let windowStart = currentPage - half;
    let windowEnd = currentPage + half;

    // Adjust if we are near the beginning
    if (windowStart <= 1) {
        windowStart = 2;
        windowEnd = Math.min(maxVisible - 1, totalPages - 1);
    }

    // Adjust if we are near the end
    if (windowEnd >= totalPages) {
        windowEnd = totalPages - 1;
        windowStart = Math.max(2, totalPages - maxVisible + 2);
    }

    // Left ellipsis if there is space between page 1 and the window
    if (windowStart > 2) {
        items.push({ type: "ellipsis", value: "…" });
    }

    // Pages in the window
    for (let i = windowStart; i <= windowEnd; i++) {
        items.push({ type: "page", value: i });
    }

    // Right ellipsis if there is space between the window and the last page
    if (windowEnd < totalPages - 1) {
        items.push({ type: "ellipsis", value: "…" });
    }

    // Always show the last page
    items.push({ type: "page", value: totalPages });

    return items;
}