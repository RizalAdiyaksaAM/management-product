import { updateProduct, type ProductPayload } from "@/api/product/service-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProductInput {
  id: number;
  payload: ProductPayload;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateProductInput) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
