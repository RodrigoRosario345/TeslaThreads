'use client';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "../../ui/Button/Button";
import { useRouter } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    urlBase?: string;
}

export function Pagination({ totalPages, currentPage, urlBase }: PaginationProps) {
    const router = useRouter();

    const navigateToPage = (page: number) => {
        router.push(`${urlBase || '/'}?page=${page}`);
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
                <SlArrowLeft
                    size={30}
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => navigateToPage(currentPage - 1)}
                />
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    buttonStyle="secondary"
                    className={page === currentPage ? "bg-gray-700" : ""}
                    onClick={() => navigateToPage(page)}
                >
                    {page}
                </Button>
            ))}
            {currentPage < totalPages && (
                <SlArrowRight
                    size={30}
                    className="text-gray-500 font-black  cursor-pointer hover:text-gray-700"
                    onClick={() => navigateToPage(currentPage + 1)}
                />
            )}
        </div>
    );
}
