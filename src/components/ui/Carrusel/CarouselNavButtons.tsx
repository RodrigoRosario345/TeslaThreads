import { motion } from "motion/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselNavButtonsProps {
    isFirstSlide: boolean;
    isLastSlide: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export function CarouselNavButtons({
    isFirstSlide,
    isLastSlide,
    onPrev,
    onNext,
}: CarouselNavButtonsProps) {


    const transition = { duration: 0.15 };

    return (
        <>
            <motion.div
                className="hidden group-hover:block absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full p-2 rounded-full bg-black/30 cursor-pointer"
                whileHover={{
                    scale: 1.15,
                    transition
                }}
                animate={{
                    translate: !isFirstSlide ? "50%" : "-100%",
                    opacity: !isFirstSlide ? 1 : 0,
                    transition
                }}
                onClick={onPrev}
            >
                <IoIosArrowBack color="white" size="24px" />
            </motion.div>
            <motion.div
                className="hidden group-hover:block absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 p-2 rounded-full bg-black/30 cursor-pointer"
                whileHover={{
                    scale: 1.15,
                    transition
                }}
                animate={{
                    translate: !isLastSlide ? "-50%" : "100%",
                    opacity: !isLastSlide ? 1 : 0,
                    transition
                }}
                onClick={onNext}
            >
                <IoIosArrowForward color="white" size="24px" />
            </motion.div>
        </>
    );
}
