import { ReactNode } from "react";

export interface CarouselItem {
    title: string;
    description: string;
    id: number;
}

export interface CarouselProps<T> {
    items: T[];
    renderChildrenItem: (item: T, index: number) => ReactNode;
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    loop?: boolean;
    round?: boolean;
}
