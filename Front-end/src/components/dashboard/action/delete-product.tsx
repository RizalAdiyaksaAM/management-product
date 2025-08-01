// Enhanced DeleteProductModal.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";

import { useDeleteProduct } from "@/hooks/products/use-delete-product";
import type { ProductDetail } from "@/api/product/service-product";

interface DeleteProductModalProps {
  open: boolean;
  product: ProductDetail | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  open,
  product,
  onClose,
  onSuccess,
}) => {
  const deleteMutation = useDeleteProduct();

  const handleDelete = async () => {
    if (!product?.id) return;

    deleteMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success("Produk berhasil dihapus.", {
          description: `${product.name} telah dihapus dari sistem.`,
        });
        onClose();
        onSuccess?.();
      },
      onError: (err) => {
        toast.error("Gagal menghapus produk.", {
          description: (err as Error)?.message || "Terjadi kesalahan saat menghapus produk.",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
        {/* Header with Warning Design */}
        <div className=" pl-6 relative">
          <div className="absolute inset-0"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold !text-red-600 mb-1">
                Konfirmasi Hapus
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Apakah Anda yakin ingin menghapus produk ini?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Produk yang akan dihapus:
                </p>
                
                {product && (
                  <div className="bg-white rounded-lg p-4 border border-red-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Nama:</span>
                      <span className="text-sm font-bold text-gray-900">{product.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Kategori:</span>
                      <span className="text-sm text-gray-700">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Harga:</span>
                      <span className="text-sm font-bold text-green-600">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Stok:</span>
                      <span className="text-sm text-gray-700">{product.stock} unit</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Peringatan</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Data produk yang telah dihapus tidak dapat dikembalikan. Pastikan Anda sudah yakin dengan keputusan ini.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="pt-0 flex gap-3">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 rounded-xl h-11"
              disabled={deleteMutation.isPending}
            >
              <X className="h-4 w-4 mr-2" />
              Batal
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl h-11"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Ya, Hapus
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal;