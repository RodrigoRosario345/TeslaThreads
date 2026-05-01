export function LoadingContent() {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center gap-4 py-10">
            <div className="size-9 sm:size-12 border-3 sm:border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">Loading...</p>
        </main>
    );
}
