"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  query?: Record<string, string>
}

export function Pagination({ currentPage, totalPages, baseUrl, query = {} }: PaginationProps) {
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
        <Link
          href={{
            pathname: baseUrl,
            query: { ...query, page: currentPage - 1 }
          }}
        >
          <Button
            variant="outline"
            className="w-10 h-10 p-0 rounded-full border-green-500/30 text-green-400 hover:bg-green-500/20"
          >
            &lt;
          </Button>
        </Link>
      )}

      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === '...') {
          return <span key={`dots-${index}`} className="text-gray-500">...</span>;
        }

        const isCurrentPage = pageNumber === currentPage;
        return (
          <Link
            key={pageNumber}
            href={{
              pathname: baseUrl,
              query: { ...query, page: pageNumber }
            }}
          >
            <Button
              variant={isCurrentPage ? "default" : "outline"}
              className={`w-10 h-10 p-0 rounded-full ${
                isCurrentPage
                  ? "bg-green-500 text-black"
                  : "border-green-500/30 text-green-400 hover:bg-green-500/20"
              }`}
            >
              {pageNumber}
            </Button>
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={{
            pathname: baseUrl,
            query: { ...query, page: currentPage + 1 }
          }}
        >
          <Button
            variant="outline"
            className="w-10 h-10 p-0 rounded-full border-green-500/30 text-green-400 hover:bg-green-500/20"
          >
            &gt;
          </Button>
        </Link>
      )}
    </div>
  );
} 