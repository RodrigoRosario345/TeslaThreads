export function LoadingContent() {
    return (
        <div className="fixed inset-0 z-10 w-full h-screen flex flex-col items-center justify-center gap-4 bg-white">
            <div className="size-9 sm:size-12 border-3 sm:border-4 border-gray-300 border-t-primary  rounded-full animate-spin"></div>
            <span className="inline-block text-sm text-gray-600 animate-pulse">
                Loading...
            </span>
        </div>
    );
}
