import { Button } from "@/components/ui/Button/Button";
import { PaginationItem } from "@/interfaces";
import Link from "next/link";

interface PageLinkProps {
    item: PaginationItem;
    pageUrl: string;
    isActive: boolean;
}

export function PageLink({ item, pageUrl, isActive }: PageLinkProps) {
    if (item.type === "ellipsis") {
        return (
            <span
                className="inline-flex items-center justify-center w-10 h-10 text-sm text-gray-400 select-none"
                aria-hidden="true"
            >
                …
            </span>
        );
    }

    const page = item.value as number;

    return (
        <Link href={pageUrl} passHref>
            <Button
                variant={isActive ? "outline" : "ghost"}
                className="text-sm"
                aria-current={isActive ? "page" : undefined}
            >
                {page}
            </Button>
        </Link>
    );
}
