// src/features/products/components/EditProductModal.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";


import ProductForm from "../product-form";

import type { ProductDetail, ProductPayload } from "@/api/product/service-product";
import { useUpdateProduct } from "@/hooks/products/use-update-procuct";

interface EditProductModalProps {
  open: boolean;
  product: ProductDetail  | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  product,
  onClose,
  onSuccess,
}) => {
  const updateMutation = useUpdateProduct();

  const handleSubmit = async (formValues: ProductPayload) => {
    if (!product?.id) return;

    try {
      await updateMutation.mutateAsync({
        id: product.id,
        payload: formValues,
      });

      toast.success("Produk berhasil diperbarui!", {});
      onClose();
      onSuccess?.(); 
    } catch (err) {
      toast.error("Gagal update produk", {
        description: (err as Error)?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="!text-yellow-400">Edit Produk</DialogTitle>
        </DialogHeader>

        {product ? (
          <ProductForm
            defaultValues={{
              name: product.name,
              category: product.category,
              price: product.price,
              stock: product.stock,
            }}
            onSubmit={handleSubmit}
            isLoading={updateMutation.isPending}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Produk tidak ditemukan.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
