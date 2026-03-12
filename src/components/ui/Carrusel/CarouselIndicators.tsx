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
        <div className="hidden group-hover:flex w-full justify-center absolute bottom-7 left-1/2 -translate-x-1/2 ">
            <div className="my-4 flex w-37.5 justify-between px-8">
                {Array.from({ length: totalItems }).map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${activeIndex === index ? "bg-white" : "bg-[#333333]"}`}
                        animate={{
                            scale: activeIndex === index ? 1.2 : 1,
                        }}
                        onClick={() => onSelect(loop ? index + 1 : index)}
                        transition={{ duration: 0.15 }}
                    />
                ))}
            </div>
        </div>
    );
}
