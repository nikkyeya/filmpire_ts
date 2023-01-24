export interface PaginationProps {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}
