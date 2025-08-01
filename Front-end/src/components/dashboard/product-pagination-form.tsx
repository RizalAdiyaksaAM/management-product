import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import type { Pagination as PaginationInfo } from "@/api/product/service-product";

interface ProductPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { current_page, total_page } = pagination;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(current_page - 1)}
            className={current_page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm text-muted-foreground px-4 py-2 rounded">
            Halaman {current_page} dari {total_page}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(current_page + 1)}
            className={current_page >= total_page ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
