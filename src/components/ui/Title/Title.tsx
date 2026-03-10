import { firstLetterUpperCase } from "@/helpers";

export interface TitleProps {
    title: string;
    className?: string;
}

export function Title({ title, className }: TitleProps) {

    return (
        <h1 className={className || "text-2xl font-bold mb-8"}>
            {firstLetterUpperCase(title)}
        </h1>
    );
}
