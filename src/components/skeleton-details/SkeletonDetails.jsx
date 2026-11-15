// Сиви блокове с формата на страницата с детайли, докато идеята се зарежда
export default function SkeletonDetails() {
    return (
        <div className="card animate-pulse overflow-hidden">
            <div className="grid lg:grid-cols-2">
                <div className="h-64 w-full bg-stone-200 sm:h-80 lg:h-full" />

                <div className="flex flex-col gap-4 p-6 sm:p-8">
                    <div className="flex gap-2">
                        <div className="h-5 w-28 rounded-full bg-stone-200" />
                        <div className="h-5 w-16 rounded-full bg-stone-200" />
                    </div>

                    <div className="h-9 w-4/5 rounded bg-stone-200" />
                    <div className="h-4 w-48 rounded bg-stone-200" />

                    <div className="space-y-2">
                        <div className="h-3 w-36 rounded bg-stone-200" />
                        <div className="h-8 w-20 rounded bg-stone-200" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-3 w-24 rounded bg-stone-200" />
                        <div className="h-4 w-full rounded bg-stone-200" />
                        <div className="h-4 w-2/3 rounded bg-stone-200" />
                    </div>

                    <div className="mt-auto border-t border-stone-200 pt-4">
                        <div className="h-10 w-36 rounded-lg bg-stone-200" />
                    </div>
                </div>
            </div>

            <div className="space-y-3 border-t border-stone-200 p-6 sm:p-8">
                <div className="h-5 w-28 rounded bg-stone-200" />
                <div className="h-4 w-full rounded bg-stone-200" />
                <div className="h-4 w-11/12 rounded bg-stone-200" />
                <div className="h-4 w-3/4 rounded bg-stone-200" />
            </div>
        </div>
    );
}
