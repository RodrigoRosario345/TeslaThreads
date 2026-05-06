export function LoadingContent() {
    return (
        <>
            <div className="fixed inset-0 z-0 w-full h-screen flex flex-col items-center justify-center gap-4 py-10 bg-white/30 backdrop-blur-xs">
            </div>
            <div className="fixed inset-0 z-10 w-full h-screen flex flex-col items-center justify-center gap-4 bg-transparent">
                <div className="size-9 sm:size-12 border-3 sm:border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">Loading...</p>
            </div>
        </>
    );
}
