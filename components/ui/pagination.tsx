"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaginationProps {
  totalItems: number; // total items count
  itemsPerPage: number; // items per page
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  onPageChange: (page: number) => void;
  currentPageNumber: number;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  onPageChange,
  currentPageNumber,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if small number
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPageNumber > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPageNumber - 1);
      const end = Math.min(totalPages - 1, currentPageNumber + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPageNumber < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    console.log("here");
    pages.map((el, idx) => {
    console.log(el, idx);
    });

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPageNumber === 1}
        onClick={() => changePage(currentPageNumber - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant="outline"
            size="icon"
            onClick={() => changePage(page as number)}
            className={cn(
              "w-8 h-8",
              page === currentPageNumber &&
                "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            )}
          >
            {page}
          </Button>
        )
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPageNumber === totalPages}
        onClick={() => changePage(currentPageNumber + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <span className="text-sm text-muted-foreground">Rows per page:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[80px] justify-between">
            {itemsPerPage}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select rows</DropdownMenuLabel>
          {[10, 25, 50, 100].map((size) => (
            <DropdownMenuItem
              key={size}
              onClick={() => setItemsPerPage(size)}
              className={itemsPerPage === size ? "font-semibold" : ""}
            >
              {size}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
