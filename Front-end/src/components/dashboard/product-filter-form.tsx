// Enhanced ProductFilterForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Search, Filter, RotateCcw, DollarSign, Package } from "lucide-react";
import type { ProductQueryParams } from "@/api/product/service-product";

interface FilterFormProps {
  filters: ProductQueryParams;
  onFilterChange: (filters: Partial<ProductQueryParams>) => void;
}

const ProductFilterForm: React.FC<FilterFormProps> = ({ filters, onFilterChange }) => {
  const { register, handleSubmit, reset } = useForm<ProductQueryParams>({
    defaultValues: filters,
  });

  const onSubmit = (data: ProductQueryParams) => {
    const cleaned: ProductQueryParams = {
      ...data,
      name: data.name?.trim() || undefined,
      category: data.category?.trim() || undefined,
      min_price: data.min_price || undefined,
      max_price: data.max_price || undefined,
    };
    onFilterChange(cleaned);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
      >
        {/* Search Name */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Search className="inline h-4 w-4 mr-1" />
            Nama Produk
          </label>
          <Input 
            placeholder="Cari nama produk..." 
            {...register("name")}
            className="border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-blue-50/30"
          />
        </div>

        {/* Category */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Package className="inline h-4 w-4 mr-1" />
            Kategori
          </label>
          <Input 
            placeholder="Kategori..." 
            {...register("category")}
            className="border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-blue-50/30"
          />
        </div>

        {/* Min Price */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Harga Min
          </label>
          <Input
            type="number"
            placeholder="0"
            {...register("min_price", { valueAsNumber: true })}
            className="border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-blue-50/30"
          />
        </div>

        {/* Max Price */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Harga Max
          </label>
          <Input
            type="number"
            placeholder="999999"
            {...register("max_price", { valueAsNumber: true })}
            className="border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-blue-50/30"
          />
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-1 flex flex-col justify-end">
          <div className="flex gap-3">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl h-12 px-6 flex-1"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onFilterChange({
                  name: "",
                  category: "",
                  min_price: undefined,
                  max_price: undefined,
                });
              }}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl h-12 !px-4"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Active Filters Display */}
      <div className="mt-6 pt-6 border-t border-blue-100">
        <div className="flex flex-wrap gap-2">
          {filters.name && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              Nama: {filters.name}
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
              Kategori: {filters.category}
            </span>
          )}
          {filters.min_price && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              Min: Rp {filters.min_price.toLocaleString('id-ID')}
            </span>
          )}
          {filters.max_price && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              Max: Rp {filters.max_price.toLocaleString('id-ID')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterForm;