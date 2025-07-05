





export function Loader() {
    return (
        <main className="h-screen w-screen bg-foregound fixed filter opacity-[30%] flex items-center justify-center">
            <div className="flex flex-row gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" />
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
            </div>
        </main>
    )
}