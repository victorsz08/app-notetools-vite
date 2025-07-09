import { useNote } from "@/hooks/use-note";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { useNoteEditor } from "@/hooks/use-note-dialog";
import { Skeleton } from "../ui/skeleton";
import { Notebook } from "lucide-react";





export function RecentNotes() {
    const { getNotes } = useNote();
    const { open } = useNoteEditor();

    const { data, isPending } = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
        initialData: {
            notes: [],
            totalItems: 0,
            totalPages: 0,
            limit: 0,
            page: 0,
        },
        refetchOnWindowFocus: false,
    });


    const notes = data?.notes.slice(0, 2);

    if(isPending) return (<Skeleton className="w-full h-auto bg-muted" />)

    return (
        <Card className="w-full h-[260px]">
            <CardHeader className="flex justify-start gap-2 items-center">
                <span className="bg-primary/20 w-fit p-2 rounded-sm text-primary">
                    <Notebook className="w-5 h-5" />
                </span>
                <div className="flex items-center justify-between w-full">
                <CardTitle>Notas recentes</CardTitle>
                <Link to="/anotacoes" className="text-xs text-muted-foreground/80 underline hover:text-primary">
                    Todas as anotações
                </Link>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {notes.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex flex-col rounded-md p-2 border border-border gap-3 items-start justify-between cursor-pointer" 
                        onClick={() => open(item.title, item.content, item.id)}
                    >
                        <h1 className="text-sm font-semibold text-muted-foreground">{item.title}</h1>
                        <span className="text-xs text-muted-foreground/80">{item.content.replace(/<[^>]*>?/g, '').slice(0, 20)}...</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}