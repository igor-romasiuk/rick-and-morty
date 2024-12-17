import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationRange: number[];
}

const Pagination = ({ currentPage, totalPages, paginationRange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 my-6 px-2">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          <Button variant="outline" className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300">
            {"<"}
          </Button>
        </Link>
      )}

      {currentPage > 3 && (
        <Link href={`?page=1`}>
          <Button variant="outline" className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300">
            1
          </Button>
        </Link>
      )}

      {currentPage > 3 && (
        <span className="px-2 py-1 sm:px-3 sm:py-2 text-green-600">...</span>
      )}

      <div className="flex items-center gap-1 sm:gap-2">
        {paginationRange.map((page) => (
          <Link key={page} href={`?page=${page}`} passHref>
            <Button
              variant={currentPage === page ? "default" : "outline"}
              className={`px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              {page}
            </Button>
          </Link>
        ))}
      </div>

      {currentPage < totalPages - 2 && (
        <span className="px-2 py-1 sm:px-3 sm:py-2 text-green-600">...</span>
      )}

      {currentPage < totalPages - 2 && (
        <Link href={`?page=${totalPages}`}>
          <Button variant="outline" className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300">
            {totalPages}
          </Button>
        </Link>
      )}

      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`}>
          <Button variant="outline" className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300">
            {">"}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
