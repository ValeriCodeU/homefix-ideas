export default function SkeletonCard() {
    return (
        <div className="card overflow-hidden">
            <div className="aspect-4/3 w-full bg-stone-200" />
            <div className="flex flex-col gap-3 p-4">
                <div className="h-5 w-3/4 rounded bg-stone-200" />
                <div className="h-4 w-full rounded bg-stone-200" />
                <div className="h-4 w-5/6 rounded bg-stone-200" />
                <div className="flex gap-2 pt-2">
                    <div className="h-5 w-16 rounded-full bg-stone-200" />
                    <div className="h-5 w-20 rounded-full bg-stone-200" />
                </div>
            </div>
        </div>
    );
}
