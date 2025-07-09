import { useNote } from "@/hooks/use-note";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { useNoteEditor } from "@/hooks/use-note-dialog";
import { Skeleton } from "../ui/skeleton";
import moment from "moment";


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
        <Card className="w-full h-[260px] flex flex-col justify-between">
            <CardHeader>
                <div className="flex items-center justify-between w-full">
                <CardTitle>Notas recentes</CardTitle>
                <Link to="/anotacoes" className="text-xs text-muted-foreground/80 underline hover:text-primary">
                    Todas as anotações
                </Link>
                </div>
                <CardDescription className="text-xs">Suas últimas anotações</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {notes.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex flex-col rounded-md p-2 border border-border gap-3 items-start 
                        justify-between cursor-pointer bg-muted/60 hover:bg-muted hover:outline-1 transition-all" 
                        onClick={() => open(item.title, item.content, item.id)}
                    >
                        <h1 className="text-xs font-semibold text-muted-foreground">{item.title}</h1>
                        <span className="text-[10px] flex items-center gap-1 text-muted-foreground/80">
                            <p>Última atualização</p>
                            <p>{moment(item.updatedAt).locale("pt-BR").format("DD MMM YYYY")}</p>
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}