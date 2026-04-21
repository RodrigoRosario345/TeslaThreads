"use client";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "../../ui/Button/Button";
import Link from "next/link";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    urlBase?: string;
}

export function Pagination({
    totalPages,
    currentPage,
    urlBase,
}: PaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
                <Link href={`${urlBase || "/"}?page=${currentPage - 1}`} passHref>
                    <SlArrowLeft
                        size={30}
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                    />
                </Link>
            )}
            {pages.map((page) => (
                <Link href={`${urlBase || "/"}?page=${page}`} passHref key={page}>
                    <Button
                        buttonStyle="secondary"
                        className={page === currentPage ? "bg-gray-700" : ""}
                    >
                        {page}
                    </Button>
                </Link>
            ))}
            {currentPage < totalPages && (
                <Link href={`${urlBase || "/"}?page=${currentPage + 1}`} passHref>
                    <SlArrowRight
                        size={30}
                        className="text-gray-500 font-black  cursor-pointer hover:text-gray-700"
                    />
                </Link>
            )}
        </nav>
    );
}
