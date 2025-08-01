// Enhanced ProductViewModal.tsx
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Tag, 
  DollarSign, 
  BarChart3, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import type { ProductPayload } from "@/api/product/service-product";

interface ProductViewModalProps {
  open: boolean;
  product: ProductPayload | null;
  onClose: () => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({
  open,
  product,
  onClose,
}) => {
  // Function to get stock status
  const getStockStatus = (stock: number) => {
    if (stock > 20) {
      return {
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: TrendingUp,
        text: "Stok Baik",
        description: "Stok tersedia dengan baik"
      };
    } else if (stock > 5) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: AlertCircle,
        text: "Stok Terbatas",
        description: "Perlu perhatian untuk restok"
      };
    } else {
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: TrendingDown,
        text: "Stok Rendah",
        description: "Segera lakukan restok"
      };
    }
  };

  const stockStatus = product ? getStockStatus(product.stock) : null;
  const StockIcon = stockStatus?.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className=" p-6 relative">
          <div className="absolute inset-0 "></div>
          <div className="relative z-10 flex items-center gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold !text-blue-900">
                Detail Produk
              </DialogTitle>
              <DialogDescription className="text-black">
                Informasi lengkap tentang produk yang dipilih
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {product ? (
            <div className="space-y-6">
              {/* Product Name Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">Nama Produk</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Tag className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Kategori</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{product.category}</p>
                </div>

                {/* Price */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Harga Satuan</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Stock Status Card */}
              {stockStatus && StockIcon && (
                <div className={`rounded-xl p-6 border ${stockStatus.borderColor} ${stockStatus.bgColor}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-white rounded-xl border ${stockStatus.borderColor}`}>
                      <StockIcon className={`h-6 w-6 ${stockStatus.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className={`h-4 w-4 ${stockStatus.color}`} />
                        <span className="text-sm font-medium text-gray-600">Stok Tersedia</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800 mb-1">
                        {product.stock} unit
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {stockStatus.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Ringkasan Produk</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Nilai Stok:</span>
                    <p className="font-bold text-gray-800">
                      Rp {(product.price * product.stock).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className={`font-bold ${stockStatus?.color}`}>
                      {product.stock > 0 ? 'Tersedia' : 'Habis'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-xl inline-block mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Produk tidak ditemukan</p>
              <p className="text-sm text-gray-400 mt-1">
                Data produk tidak tersedia atau telah dihapus
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="p-6 pt-0">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl h-11"
            >
              <Eye className="h-4 w-4 mr-2" />
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModal;