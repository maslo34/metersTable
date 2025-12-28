import { useState, useEffect } from 'react';

import { PaginationButton, PaginationWrapp } from './Pagination.style';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const NUMBER_OF_BTN_DESKTOP = 7;
const ELLIPSIS_THRESHOLD_DESKTOP = 5;
const ELLIPSIS_SYMBOL = -1;
const FIRST_PAGE_NUMBER = 1;
const SECOND_PAGE_NUMBER = 2;

const SLOTS_FOR_ELLIPSIS_AND_FIRST_PAGE = 2;
const MINIMUM_PAGE_NUMBER = 1;

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    const pages: number[] = [];

    if (totalPages <= NUMBER_OF_BTN_DESKTOP) {
      for (let i = MINIMUM_PAGE_NUMBER; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const showEllipsisStart = currentPage > ELLIPSIS_THRESHOLD_DESKTOP;

      if (!showEllipsisStart) {
        for (let i = MINIMUM_PAGE_NUMBER; i <= NUMBER_OF_BTN_DESKTOP; i++) {
          if (i === NUMBER_OF_BTN_DESKTOP) {
            pages.push(ELLIPSIS_SYMBOL);
          } else {
            pages.push(i);
          }
        }
      } else {
        pages.push(FIRST_PAGE_NUMBER);
        pages.push(ELLIPSIS_SYMBOL);

        const remainingSlots =
          NUMBER_OF_BTN_DESKTOP - SLOTS_FOR_ELLIPSIS_AND_FIRST_PAGE;
        const startPage = Math.max(
          SECOND_PAGE_NUMBER,
          currentPage - Math.floor(remainingSlots / 2)
        );
        const endPage = Math.min(totalPages, startPage + remainingSlots - 1);

        const adjustedStartPage = Math.max(
          SECOND_PAGE_NUMBER,
          endPage - remainingSlots + 1
        );
        for (let i = adjustedStartPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
    }

    setVisiblePages(pages);
  }, [currentPage, totalPages]);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  if (totalPages === 1) return null;
  return (
    <PaginationWrapp>
      {visiblePages.map((page) =>
        page === ELLIPSIS_SYMBOL ? (
          <PaginationButton key={`ellipsis-${Math.random()}`} disabled>
            {'...'}
          </PaginationButton>
        ) : (
          <PaginationButton
            key={page}
            $isActive={currentPage === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationButton>
        )
      )}
    </PaginationWrapp>
  );
};
