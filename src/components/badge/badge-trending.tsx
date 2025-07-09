import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";




type VariantTrending = "up" | "down" | "stable";
const VariantTrending = {
    up: "up" as VariantTrending,
    down: "down" as VariantTrending,
    stable: "stable" as VariantTrending,
} as const;

const variantClass = {
    up: "bg-green-500 text-green-700",
    down: "bg-red-500 text-red-700",
    stable: "bg-slate-500 text-slate-700",
} as const;

interface BadgeTrendingProps {
    variant: VariantTrending;
    children?: React.ReactNode;
}

export function BadgeTrending({ variant, children }: BadgeTrendingProps) {
    const variantClasses = variantClass[variant];

    return (
        <div className={`${variantClasses} rounded-sm p-2 text-xs flex items-center gap-1`}>
            {variant === "up" && <ArrowUp className="w-3 h-3" />}
            {variant === "down" && <ArrowDown className="w-3 h-3" />}
            {variant === "stable" && <ArrowUpDown className="w-3 h-3" />}
            {children}
        </div>
    )
}