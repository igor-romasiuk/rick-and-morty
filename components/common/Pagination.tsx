"use client"

import { Button } from "@/components/ui/Button"
import { PaginationProps } from "@/types/common"
import { useRouter } from "next/navigation"

export function Pagination({ currentPage, totalPages, baseUrl, query = {} }: PaginationProps) {
  const router = useRouter()

  const navigateWithScroll = (page: number) => {
    const queryParams = new URLSearchParams({ ...query, page: page.toString() }).toString()
    const url = `${baseUrl}?${queryParams}`

    window.scrollTo({ top: 0, behavior: 'instant' })
    
    router.push(url)
  }

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    let l;
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Button
          variant="outline"
          className="w-10 h-10 p-0 rounded-full border-green-500/30 text-green-400 hover:bg-green-500/20"
          onClick={() => navigateWithScroll(currentPage - 1)}
        >
          &lt;
        </Button>
      )}

      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === '...') {
          return <span key={`dots-${index}`} className="text-gray-500">...</span>;
        }

        const isCurrentPage = pageNumber === currentPage;
        return (
          <Button
            key={pageNumber}
            variant={isCurrentPage ? "default" : "outline"}
            className={`w-10 h-10 p-0 rounded-full ${isCurrentPage
              ? "bg-green-500 text-black"
              : "border-green-500/30 text-green-400 hover:bg-green-500/20"
              }`}
            onClick={() => !isCurrentPage && navigateWithScroll(Number(pageNumber))}
            disabled={isCurrentPage}
          >
            {pageNumber}
          </Button>
        );
      })}

      {currentPage < totalPages && (
        <Button
          variant="outline"
          className="w-10 h-10 p-0 rounded-full border-green-500/30 text-green-400 hover:bg-green-500/20"
          onClick={() => navigateWithScroll(currentPage + 1)}
        >
          &gt;
        </Button>
      )}
    </div>
  );
} 