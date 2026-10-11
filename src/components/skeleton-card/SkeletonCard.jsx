export default function SkeletonCard() {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="h-44 w-full bg-slate-200" />
            <div className="flex flex-col gap-3 p-4">
                <div className="flex gap-2">
                    <div className="h-5 w-20 rounded-full bg-slate-200" />
                    <div className="h-5 w-16 rounded-full bg-slate-200" />
                </div>
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>
        </div>
    )
}
