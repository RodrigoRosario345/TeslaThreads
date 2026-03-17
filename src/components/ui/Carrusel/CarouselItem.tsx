import type { CarouselItem } from "@/interfaces";
import { motion, useTransform } from "motion/react";

interface CarouselItemProps<T> {
    item: T extends {id?: string} ? T : never;
    index: number;
    itemWidth?: number;
    round: boolean;
    trackItemOffset?: number;
    x?: any;
    transition: any;
    children: React.ReactNode;
}

export function CarouselItem<T>({
    round,
    transition,
    children,
}: CarouselItemProps<T>) {
    // const range = [
    //     -(index + 1) * trackItemOffset,
    //     -index * trackItemOffset,
    //     -(index - 1) * trackItemOffset,
    // ];
    // const outputRange = [90, 0, -90];
    // const rotateY = useTransform(x, range, outputRange, { clamp: false });

    return (
        <motion.div
            className={`size-full relative shrink-0 flex flex-col ${round
                ? "items-center justify-center text-center bg-[#060010] rounded-3xl"
                : "items-start justify-between bg-[#222]"
                } overflow-hidden cursor-grab active:cursor-grabbing`}
            // style={{
            //     width: itemWidth,
            //     height: itemWidth,
            //     // rotateY: rotateY,
            //     // ...(round && { borderRadius: "50%" }),
            // }}
            transition={transition}
        >
            {children}
            {/* <div className="p-5">
                <div className="mb-1 font-black text-lg text-white">{item.title}</div>
                <p className="text-sm text-white">{item.description}</p>
            </div> */}
        </motion.div>
    );
}
