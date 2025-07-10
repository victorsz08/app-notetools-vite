




interface BadgeFiltersProps {
    children: React.ReactNode;
};

export function BadgeFilters({ children }: BadgeFiltersProps) {

    return (
        <div 
            className="bg-card py-1 rounded-md px-2 text-xs
             text-muted-foreground/80 border border-muted-foreground/80 flex items-center gap-1">
            {children}
        </div>
    )
}