import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | "ellipsis-left" | "ellipsis-right")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis-right", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + 1 + i
    );
    return [1, "ellipsis-left", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  );
  return [1, "ellipsis-left", ...middleRange, "ellipsis-right", totalPages];
}

export interface PaginationProps
  extends Omit<React.ComponentProps<"nav">, "children"> {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  siblingCount?: number;
  children?: React.ReactNode;
}

function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  siblingCount = 1,
  children,
  ...props
}: PaginationProps) {
  if (currentPage !== undefined && totalPages !== undefined) {
    if (totalPages <= 0) return null;

    const pages = getPaginationRange(currentPage, totalPages, siblingCount);

    return (
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1 && !isLoading) {
                  onPageChange?.(currentPage - 1);
                }
              }}
              disabled={currentPage <= 1 || isLoading}
            />
          </PaginationItem>

          {pages.map((page, index) => {
            if (page === "ellipsis-left" || page === "ellipsis-right") {
              return (
                <PaginationItem key={`${page}-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isSelected = page === currentPage;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={isSelected}
                  onClick={() => {
                    if (!isSelected && !isLoading) {
                      onPageChange?.(page);
                    }
                  }}
                  disabled={isLoading}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages && !isLoading) {
                  onPageChange?.(currentPage + 1);
                }
              }}
              disabled={currentPage >= totalPages || isLoading}
            />
          </PaginationItem>
        </PaginationContent>
      </nav>
    );
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("list-none", className)} {...props} />;
}

export interface PaginationLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  href?: string;
}

function PaginationLink({
  className,
  isActive,
  href,
  children,
  disabled,
  ...props
}: PaginationLinkProps) {
  const commonClasses = cn(
    "inline-flex items-center justify-center min-w-[34px] h-8 px-2.5 rounded-lg text-sm font-medium select-none transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
    isActive
      ? "bg-primary-500 text-white font-bold"
      : "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        className={commonClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      disabled={disabled}
      className={commonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export interface PaginationNavigatorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

function PaginationPrevious({
  className,
  href,
  disabled,
  ...props
}: PaginationNavigatorProps) {
  const commonClasses = cn(
    "inline-flex items-center justify-center size-8 rounded-lg transition-colors select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
    disabled
      ? "text-slate-300 dark:text-slate-700 cursor-not-allowed pointer-events-none"
      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer",
    className
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        aria-label="Go to previous page"
        data-slot="pagination-previous"
        className={commonClasses}
      >
        <ChevronLeft className="size-4" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label="Go to previous page"
      data-slot="pagination-previous"
      disabled={disabled}
      className={commonClasses}
      {...props}
    >
      <ChevronLeft className="size-4" />
    </button>
  );
}

function PaginationNext({
  className,
  href,
  disabled,
  ...props
}: PaginationNavigatorProps) {
  const commonClasses = cn(
    "inline-flex items-center justify-center size-8 rounded-lg transition-colors select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
    disabled
      ? "text-slate-300 dark:text-slate-700 cursor-not-allowed pointer-events-none"
      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer",
    className
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        aria-label="Go to next page"
        data-slot="pagination-next"
        className={commonClasses}
      >
        <ChevronRight className="size-4" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label="Go to next page"
      data-slot="pagination-next"
      disabled={disabled}
      className={commonClasses}
      {...props}
    >
      <ChevronRight className="size-4" />
    </button>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center text-slate-400", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
