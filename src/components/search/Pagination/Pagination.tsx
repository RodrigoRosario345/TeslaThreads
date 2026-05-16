"use client";

import { usePagination } from "@/hooks/usePagination";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PageLink } from "../PageLink/PageLink";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    baseUrl?: string;
    maxVisiblePages?: number;
}

export function Pagination({
    totalPages,
    currentPage,
    baseUrl = "",
    maxVisiblePages = 7,
}: PaginationProps) {
    const {
        items,
        hasPreviousPage,
        hasNextPage,
        previousPage,
        nextPage,
        getPageUrl,
        isCurrentPage,
    } = usePagination({ totalPages, currentPage, maxVisiblePages, baseUrl });

    return (
        <nav
            className="flex justify-center items-center gap-1.5 mt-8"
            aria-label="Pagination"
        >
            {hasPreviousPage && (
                <Link
                    href={getPageUrl(previousPage!)}
                    passHref
                    className="flex items-center gap-1.5 hover:bg-gray-100 rounded px-4 py-2.5 transition-colors"
                    aria-label="Go to previous page"
                >
                    <IoIosArrowBack size={16} />
                    <span className="text-sm font-medium">Previous</span>
                </Link>
            )}

            {items.map((item, index) => (
                <PageLink
                    key={
                        item.type === "ellipsis"
                            ? `ellipsis-${index}`
                            : `page-${item.value}`
                    }
                    item={item}
                    pageUrl={getPageUrl(item.value as number)}
                    isActive={item.type === "page" && isCurrentPage(item.value as number)}
                />
            ))}

            {hasNextPage && (
                <Link
                    href={getPageUrl(nextPage!)}
                    passHref
                    className="flex items-center gap-1.5 hover:bg-gray-100 rounded px-4 py-2.5 transition-colors"
                    aria-label="Go to next page"
                >
                    <span className="text-sm font-medium">Next</span>
                    <IoIosArrowForward size={16} />
                </Link>
            )}
        </nav>
    );
}
