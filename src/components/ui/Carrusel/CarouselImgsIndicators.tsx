import Image from "next/image";

interface CarouselImgsIndicatorsProps {
    imgs: string[];
    activeIndex: number;
    loop: boolean;
    onSelect: (index: number) => void;
}

export function CarouselImgsIndicators({
    imgs,
    activeIndex,
    loop,
    onSelect,
}: CarouselImgsIndicatorsProps) {
    return (
        <div className=" hidden lg:flex flex-col  items-center gap-3 order-first">
            {imgs.map((img, index) => (
                <div
                    key={index}
                    className={`relative size-30 rounded-lg cursor-pointer overflow-hidden transition-all hover:scale-110 `}
                    onClick={() => onSelect(loop ? index + 1 : index)}
                >
                    <Image
                        src={`/products/${img}`}
                        alt={`Indicator Image ${index}`}
                        sizes="max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className={`object-cover transition-opacity ${activeIndex === index ? "opacity-100" : "opacity-50"}`}
                    />
                </div>
            ))}
        </div>
    );
}
