// Enhanced ProductTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";
import type { ProductDetail } from "@/api/product/service-product";
import ProductTableRow from "./product-table-row";

interface ProductTableProps {
  products: ProductDetail[];
  isFetching?: boolean;
  onViewProduct?: (product: ProductDetail) => void;
  onEditProduct?: (product: ProductDetail) => void;
  onDeleteProduct?: (product: ProductDetail) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isFetching,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  if (!isFetching && products.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
              <Package className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-gray-600 max-w-md">
              Belum ada produk yang ditambahkan atau tidak ada yang sesuai dengan filter pencarian Anda.
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log("📦 ProductTable receives:", products);

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none">
            <TableHead className="text-white font-semibold text-sm uppercase tracking-wide py-4 px-6">
              Nama Produk
            </TableHead>
            <TableHead className="text-white font-semibold text-sm uppercase tracking-wide py-4 px-6">
              Kategori
            </TableHead>
            <TableHead className="text-white font-semibold text-sm uppercase tracking-wide py-4 px-6">
              Harga
            </TableHead>
            <TableHead className="text-white font-semibold text-sm uppercase tracking-wide py-4 px-6">
              Stok
            </TableHead>
            <TableHead className="text-white font-semibold text-sm uppercase tracking-wide py-4 px-6 text-right">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-blue-50/50 border-b border-gray-100">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex justify-end space-x-2">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : products.map((product, index) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  index={index}
                  onView={onViewProduct}
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}
                />
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;