import { getAllProducts, type ProductQueryParams } from "@/api/product/service-product";
import { useQuery } from "@tanstack/react-query";

export const productQueryKey = (params: ProductQueryParams) => ["products", params];

export const useProductsQuery = (params: ProductQueryParams) => {
  return useQuery({
    queryKey: productQueryKey(params),
    queryFn: () => getAllProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};
