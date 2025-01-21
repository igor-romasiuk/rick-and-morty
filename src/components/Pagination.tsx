'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationRange: number[];
}

const Pagination = ({ currentPage, totalPages, paginationRange }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    router.push(`?${createQueryString(page)}`);
  };

  // Loading skeleton for server-side rendering
  if (!isClient) {
    return (
      <div className="flex justify-center items-center gap-2 sm:gap-4 my-6 px-2 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-10 h-10 bg-gray-700 rounded-full"></div>
        ))}
      </div>
    );
  }

  return (
    <nav 
      role="navigation" 
      aria-label="Pagination"
      className="flex justify-center items-center gap-2 sm:gap-4 my-6 px-2"
    >
      {/* Previous Page Button */}
      {currentPage > 1 && (
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Go to previous page"
          className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300"
        >
          <span aria-hidden="true">{"<"}</span>
        </Button>
      )}

      {/* First Page */}
      {currentPage > 3 && (
        <Button
          variant="outline"
          onClick={() => handlePageChange(1)}
          aria-label="Go to first page"
          className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300"
        >
          1
        </Button>
      )}

      {/* Ellipsis */}
      {currentPage > 3 && (
        <span className="px-2 py-1 sm:px-3 sm:py-2 text-green-600" aria-hidden="true">
          ...
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2" role="group" aria-label="Page navigation">
        {paginationRange.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Ellipsis */}
      {currentPage < totalPages - 2 && (
        <span className="px-2 py-1 sm:px-3 sm:py-2 text-green-600" aria-hidden="true">
          ...
        </span>
      )}

      {/* Last Page */}
      {currentPage < totalPages - 2 && (
        <Button
          variant="outline"
          onClick={() => handlePageChange(totalPages)}
          aria-label="Go to last page"
          className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300"
        >
          {totalPages}
        </Button>
      )}

      {/* Next Page Button */}
      {currentPage < totalPages && (
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Go to next page"
          className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300"
        >
          <span aria-hidden="true">{">"}</span>
        </Button>
      )}
    </nav>
  );
};

export default Pagination;
