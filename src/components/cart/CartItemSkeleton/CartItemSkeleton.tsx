export function CartItemSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-30 animate-pulse">
            <div className="block lg:hidden w-full border-b-[0.5px] border-gray-300" />
            <div className="w-full space-y-6">
                <div className="h-5 rounded bg-gray-300"></div>
                <div className="h-4 w-30 rounded bg-gray-300"></div>
                <div className="w-full flex space-x-5">
                    <div className="min-w-25 h-25 rounded-md bg-gray-300"></div>
                    <div className="w-full space-y-3">
                        <div className="flex justify-between gap-10 lg:gap-25">
                            <div className="h-4 w-full max-w-40 rounded bg-gray-300"></div>
                            <div className="h-4 w-full max-w-15 rounded bg-gray-300"></div>
                        </div>
                        <div className="h-4 w-full max-w-15 rounded bg-gray-300"></div>
                        <div className="flex gap-12">
                            <div className="h-4 w-full max-w-28 rounded bg-gray-300"></div>
                            <div className="h-4 w-full max-w-25 rounded bg-gray-300"></div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex space-x-5">
                    <div className="min-w-25 h-25 rounded-md bg-gray-300"></div>
                    <div className="w-full space-y-3">
                        <div className="flex justify-between gap-10 lg:gap-25">
                            <div className="h-4 w-full max-w-40 rounded bg-gray-300"></div>
                            <div className="h-4 w-full max-w-15 rounded bg-gray-300"></div>
                        </div>
                        <div className="h-4 w-full max-w-15 rounded bg-gray-300"></div>
                        <div className="flex gap-12">
                            <div className="h-4 w-full max-w-28 rounded bg-gray-300"></div>
                            <div className="h-4 w-full max-w-25 rounded bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block lg:hidden w-full border-b-[0.5px] border-black" />
            <div className="w-full h-max space-y-3 lg:p-8 lg:rounded-md lg:shadow-xl lg:max-w-sm">
                <div className="h-5 w-30 rounded bg-gray-300"></div>
                <div className="flex justify-between gap-10 lg:gap-25">
                    <div className="h-4 w-28 rounded bg-gray-300"></div>
                    <div className="h-4 w-28 rounded bg-gray-300"></div>
                </div>
                <div className="flex justify-between gap-10 lg:gap-25">
                    <div className="h-4 w-29 rounded bg-gray-300"></div>
                    <div className="h-4 w-20 rounded bg-gray-300"></div>
                </div>
                <div className="flex justify-between gap-10 lg:gap-25">
                    <div className="h-4 w-30 rounded bg-gray-300"></div>
                    <div className="h-4 w-25 rounded bg-gray-300"></div>
                </div>
                <div className="flex justify-between gap-10 lg:gap-25">
                    <div className="h-5 w-25 rounded bg-gray-300"></div>
                    <div className="h-5 w-30 rounded bg-gray-300"></div>
                </div>
                <div className="w-full fixed bottom-0 left-0 px-4 py-6 text-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] bg-white lg:static lg:shadow-none lg:p-0">
                    <div className="h-10 w-full max-w-120 m-auto rounded bg-gray-300"></div>
                </div>
            </div>
        </div>
    );
}
