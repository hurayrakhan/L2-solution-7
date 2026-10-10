import * as React from "react";

export interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
  maxPageButtons?: number;
}

export interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
  pageNumbers: (number | "dots")[];
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
  maxPageButtons = 5,
}: UsePaginationOptions): UsePaginationResult {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const setPage = React.useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const nextPage = React.useCallback(() => {
    setPage(currentPage + 1);
  }, [currentPage, setPage]);

  const prevPage = React.useCallback(() => {
    setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const pageNumbers = React.useMemo(() => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "dots")[] = [];
    const sideItems = Math.floor(maxPageButtons / 2);

    let start = Math.max(2, currentPage - sideItems);
    let end = Math.min(totalPages - 1, currentPage + sideItems);

    if (currentPage - sideItems <= 2) {
      end = 1 + maxPageButtons - 2;
    }
    if (currentPage + sideItems >= totalPages - 1) {
      start = totalPages - (maxPageButtons - 2);
    }

    pages.push(1);
    if (start > 2) {
      pages.push("dots");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("dots");
    }
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, maxPageButtons]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex,
    endIndex,
    pageNumbers,
    setPage,
    nextPage,
    prevPage,
  };
}
