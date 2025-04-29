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
    const siblingsCount = 2;
    
    const pageRange = [1];
    
    for (let i = currentPage - siblingsCount; i <= currentPage + siblingsCount; i++) {
      if (i > 1 && i < totalPages) {
        pageRange.push(i);
      }
    }
    
    if (totalPages > 1) {
      pageRange.push(totalPages);
    }
    
    const paginationWithEllipsis = [];
    let previousPage = null;
    
    for (const page of pageRange) {
      if (previousPage) {
        if (page - previousPage === 2) {
          paginationWithEllipsis.push(previousPage + 1);
        } 
        else if (page - previousPage > 1) {
          paginationWithEllipsis.push('...');
        }
      }
      
      paginationWithEllipsis.push(page);
      previousPage = page;
    }
    
    return paginationWithEllipsis;
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
        if (pageNumber === '0') {
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
