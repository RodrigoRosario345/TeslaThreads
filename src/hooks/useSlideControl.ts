import { useState } from "react";

export type SlideIndex = 1 | 2 | 3 | 4;

const MAX_SLIDES = 4;
const MIN_SLIDE = 1;

export const useSlideControl = (initialSlide: SlideIndex = 1) => {
    const [currentSlide, setCurrentSlide] = useState<SlideIndex>(initialSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, MAX_SLIDES) as SlideIndex);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, MIN_SLIDE) as SlideIndex);
    };

    const goToSlide = (slide: SlideIndex) => {
        setCurrentSlide(slide);
    };

    return {
        currentSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        isFirstSlide: currentSlide === MIN_SLIDE,
        isLastSlide: currentSlide === MAX_SLIDES,
    };
};
