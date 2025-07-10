import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  className = "",
}: PaginationProps) {
  const goToFirstPage = () => onPageChange(1);
  const goToPreviousPage = () => onPageChange(currentPage - 1);
  const goToNextPage = () => onPageChange(currentPage + 1);
  const goToLastPage = () => onPageChange(totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className={`flex items-center w-full justify-between ${className}`}>
      <span className="text-xs text-muted-foreground">
        Total de {totalItems} encontrados
      </span>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={goToFirstPage}
          disabled={isFirstPage}
          size="sm"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="secondary"
          disabled={isFirstPage}
          onClick={goToPreviousPage}
          size="sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={goToNextPage}
          disabled={isLastPage}
          size="sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={goToLastPage}
          disabled={isLastPage}
          size="sm"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      <span className="text-xs text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>
    </div>
  );
}
