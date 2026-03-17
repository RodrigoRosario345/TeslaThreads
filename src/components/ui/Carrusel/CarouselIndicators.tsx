import { motion } from "motion/react";

interface CarouselIndicatorsProps {
    totalItems: number;
    activeIndex: number;
    loop: boolean;
    onSelect: (index: number) => void;
}

export function CarouselIndicators({
    totalItems,
    activeIndex,
    loop,
    onSelect,
}: CarouselIndicatorsProps) {
    return (
        <div className="mx-auto absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 p-4 z-10">
            {Array.from({ length: totalItems }).map((_, index) => (
                <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${activeIndex === index ? "bg-gray-400" : "bg-[#333333]"}`}
                    animate={{
                        scale: activeIndex === index ? 1.4 : 1,
                    }}
                    onClick={() => onSelect(loop ? index + 1 : index)}
                    transition={{ duration: 0.15 }}
                />
            ))}
        </div>

    );
}
