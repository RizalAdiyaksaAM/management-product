// Enhanced ProductDashboardPage.tsx
import { useState } from "react";
import { useProductsQuery } from "@/hooks/products/use-product";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import type {
  ProductDetail,
  ProductQueryParams,
} from "@/api/product/service-product";

import ProductTable from "@/components/dashboard/produtc-table";
import ProductViewModal from "@/components/dashboard/action/product-view-modal";
import EditProductModal from "@/components/dashboard/action/edit-product";
import DeleteProductModal from "@/components/dashboard/action/delete-product";
import ProductFilterForm from "@/components/dashboard/product-filter-form";
import ProductPagination from "@/components/dashboard/product-pagination-form";
import CreateProductModal from "@/components/dashboard/action/create-product";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react";
import EnhancedHeader from "@/components/dashboard/header-dashboard";
import { useAuth } from "@/context/auth-context";

const ProductDashboardPage = () => {
  const { user, logout } = useAuth();

  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    page: 1,
    limit: 5,
    name: "",
    category: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useProductsQuery(queryParams);

  const handleFilterChange = (filters: Partial<ProductQueryParams>) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      page: 1, 
    }));
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleLogout = () => {
    logout();
  };


  // Prepare user info for header
  const userInfo = user ? {
    name: user.username || user.email?.split('@')[0] || 'User',
    email: user.email || 'user@example.com',
    role: user.role || 'User',
    avatar: user.avatar || undefined,
  } : undefined;

  return (
    <div className="min-h-screen from-slate-50 to-blue-50 p-6">
      <EnhancedHeader
        userInfo={userInfo}
        onLogout={handleLogout}
      />

      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="px-8 py-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Daftar Produk</h2>
              <p className="text-gray-600">Kelola inventori dan informasi produk</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 !px-6 !py-3 rounded-lg"
            >
              <Plus className="h-5 w-5 " />
              Tambah Produk
            </Button>
          </div>

          <div className="mb-6">
            <ProductFilterForm filters={queryParams} onFilterChange={handleFilterChange} />
          </div>

          <CreateProductModal
            open={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSuccess={refetch}
          />

          {isError && (
            <Alert variant="destructive" className="my-6 border-red-200 bg-red-50">
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">
                {(error as Error)?.message || "Terjadi kesalahan saat memuat produk."}
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-4 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <ProductTable
                  products={data?.data || []}
                  isFetching={isFetching}
                  onViewProduct={(product) => {
                    setSelectedProduct(product);
                    setShowViewModal(true);
                  }}
                  onEditProduct={(product) => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                  onDeleteProduct={(product) => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                />
              </div>

              <ProductViewModal
                open={showViewModal}
                product={selectedProduct}
                onClose={() => setShowViewModal(false)}
              />

              <EditProductModal
                open={showEditModal}
                product={selectedProduct}
                onClose={() => setShowEditModal(false)}
                onSuccess={refetch}
              />

              <DeleteProductModal
                open={showDeleteModal}
                product={selectedProduct}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={refetch}
              />

              {data?.pagination && (
                <div className="mt-8 flex justify-center">
                  <div>
                    <ProductPagination
                      pagination={data.pagination}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDashboardPage;