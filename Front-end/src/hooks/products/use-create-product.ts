import { createProduct } from "@/api/product/service-product";
import { useMutation } from "@tanstack/react-query";


export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
