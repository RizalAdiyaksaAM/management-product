import { getProductById } from "@/api/product/service-product";
import { useQuery } from "@tanstack/react-query";


export const useProductDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, 
  });
};
