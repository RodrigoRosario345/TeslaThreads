import { useState } from "react";

type SlideControl = (initialSlide: number, MAX_SLIDES: number, MIN_SLIDE?: number) => {
    currentSlide: number;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (slide: number) => void;
    isFirstSlide: boolean;
    isLastSlide: boolean;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
};

export const useSlideControl: SlideControl = (initialSlide, MAX_SLIDES, MIN_SLIDE = 0) => {
    const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, MAX_SLIDES));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, MIN_SLIDE));
    };

    const goToSlide = (slide: number) => {
        setCurrentSlide(slide);
    };

    return {
        setCurrentSlide,
        currentSlide,
        nextSlide,
        prevSlide,
        goToSlide,
        isFirstSlide: currentSlide === MIN_SLIDE,
        isLastSlide: currentSlide === MAX_SLIDES,
    };
};
