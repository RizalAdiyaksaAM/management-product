import { deleteProduct } from "@/api/product/service-product";
import { useMutation } from "@tanstack/react-query";


export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};
