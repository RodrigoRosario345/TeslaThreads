'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, PanInfo, useMotionValue } from "motion/react";
import { DEFAULT_ITEMS } from "@/data/carousel";
import { CarouselItem } from "./CarouselItem";
import { CarouselProps } from "@/interfaces";
import { useSlideControl } from "@/hooks";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const CONTAINER_PADING = 0;
const CONTAINER_BORDER = 0;
const GAP = 0;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 300,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false,
}: CarouselProps): React.JSX.Element {
    const itemWidth = baseWidth - CONTAINER_PADING * 2 - CONTAINER_BORDER * 2;
    const trackItemOffset = itemWidth + GAP;
    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const { currentSlide: position, nextSlide, prevSlide, setCurrentSlide: setPosition, isFirstSlide, isLastSlide } = useSlideControl(loop ? 1 : 0, itemsForRender.length - 1, loop ? 1 : 0);
    console.log("position", position, "isFirstSlide", isFirstSlide, "itemsForRender.length", itemsForRender.length);
    // const [position, setPosition] = useState<number>(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isJumping, setIsJumping] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            nextSlide();
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const startingPosition = loop ? 1 : 0;
        setPosition(startingPosition);
        x.set(-startingPosition * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    useEffect(() => {
        if (!loop && position > itemsForRender.length - 1) {
            setPosition(Math.max(0, itemsForRender.length - 1));
        }
    }, [itemsForRender.length, loop, position]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
    ): void => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition((prev) => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0,
            },
        };

    const activeIndex =
        items.length === 0
            ? 0
            : loop
                ? (position - 1 + items.length) % items.length
                : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            className={`group relative overflow-hidden border-[#222] ${round && "rounded-3xl"}`}
            style={{
                borderWidth: `${CONTAINER_BORDER}px`,
                width: `${baseWidth}px`,
                height: `${baseWidth}px`,
            }}
        >
            <motion.div
                className="flex size-full"
                drag={isAnimating ? false : "x"}
                {...dragProps}
                // style={{
                //     width: itemWidth,
                //     gap: `${GAP}px`,
                //     perspective: 1000,
                //     perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                //     x,
                // }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item, index) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        index={index}
                        itemWidth={itemWidth}
                        round={round}
                        trackItemOffset={trackItemOffset}
                        x={x}
                        transition={effectiveTransition}
                    />
                ))}
            </motion.div>
            <div
                className="hidden group-hover:flex w-full justify-center absolute z-20 bottom-7 left-1/2 -translate-x-1/2 "
            >
                <div className="my-4 flex w-37.5 justify-between px-8">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${activeIndex === index ? "bg-white" : "bg-[#333333]"}`}
                            animate={{
                                scale: activeIndex === index ? 1.2 : 1,
                            }}
                            onClick={() => setPosition(loop ? index + 1 : index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>


            <motion.div
                className={`absolute top-1/2 left-0 -translate-y-1/2  p-2 rounded-full bg-black/30 cursor-pointer`}
                whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.15 },
                }}
                animate={{
                    translate: !isFirstSlide ? "50%" : "-100%",
                    opacity: !isFirstSlide ? 1 : 0,
                    transition: { duration: 0.15 },
                }}
            >
                <IoIosArrowBack color="white" size="24px" />
            </motion.div>
            <motion.div
                className={`absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full bg-black/30 cursor-pointer`}
                whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.15 },
                }}
                animate={{
                    translate: !isLastSlide ? "-50%" : "100%",
                    opacity: !isLastSlide ? 1 : 0,
                    transition: { duration: 0.15 },
                }}
            >
                <IoIosArrowForward color="white" size="24px" />
            </motion.div>
        </div >
    );
}
