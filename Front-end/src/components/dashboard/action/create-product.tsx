import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { useCreateProduct } from "@/hooks/products/use-create-product";
import ProductForm from "../product-form";
import type { ProductPayload } from "@/api/product/service-product";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const createMutation = useCreateProduct();

  const handleSubmit = async (formValues: ProductPayload) => {
    try {
      await createMutation.mutateAsync(formValues);
      toast.success("Produk berhasil ditambahkan!");
      onClose();
      onSuccess?.();
    } catch (err) {
      toast.error("Gagal menambahkan produk", {
        description: (err as Error)?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
        </DialogHeader>

        <ProductForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
