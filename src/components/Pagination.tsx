import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number; // 0-based index
  totalPages: number; // total pages (assumed to be total page count, not index)
  onPageChange: (page: number) => void; // still expects 0-based
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentPage > 3) pages.push("_");

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 4) pages.push("_");
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center  justify-center py-2 rounded-md space-x-2 px-4">
      <button
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        className="flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        disabled={currentPage === 0}
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </button>

      <div className="border-l h-5 mx-2" />

      {pages.map((page, idx) =>
        page === "_" ? (
          <span key={`ellipsis-${idx}`} className="px-1 text-gray-500">
            _
          </span>
        ) : (
          <button
            key={`page-${page}-${idx}`}
            onClick={() => onPageChange(Number(page))}
            className={`w-7 h-7 rounded text-sm ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-black"
            }`}
          >
            {(Number(page) + 1).toString()}
          </button>
        )
      )}

      <div className="border-l h-5 mx-2" />

      <button
        onClick={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
        className="flex items-center gap-1 text-sm text-gray-700 hover:text-black"
        disabled={currentPage === totalPages - 1}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
