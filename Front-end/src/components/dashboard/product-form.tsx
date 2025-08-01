// Enhanced ProductForm.tsx with Zod validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Tag, DollarSign, BarChart3, Save, Loader2} from "lucide-react";
import type { ProductPayload } from "@/api/product/service-product";

// Zod schema for product validation
const productSchema = z.object({
  name: z
    .string()
    .min(1, "Nama produk wajib diisi")
    .min(2, "Nama produk minimal 2 karakter")
    .max(100, "Nama produk maksimal 100 karakter")
    .regex(/^[a-zA-Z0-9\s\-_\.]+$/, "Nama produk hanya boleh mengandung huruf, angka, spasi, dan karakter - _ .")
    .trim(),
  
  category: z
    .string()
    .min(1, "Kategori wajib diisi")
    .min(2, "Kategori minimal 2 karakter")
    .max(50, "Kategori maksimal 50 karakter")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Kategori hanya boleh mengandung huruf, angka, spasi, dan karakter - _")
    .trim(),
  
  price: z
    .number()
    .min(1, "Harga minimal Rp 1")
    .max(999999999, "Harga maksimal Rp 999.999.999")
    .int("Harga harus berupa bilangan bulat"),
  
  stock: z
    .number()
    .min(0, "Stok tidak boleh negatif")
    .max(999999, "Stok maksimal 999.999")
    .int("Stok harus berupa bilangan bulat")
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  defaultValues?: ProductPayload;
  onSubmit: (data: ProductPayload) => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid},
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || {
      name: "",
      category: "",
      price: undefined,
      stock: undefined
    },
    mode: "onChange" 
  });


  const onFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };


  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
          <Package className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {defaultValues ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h3>
          <p className="text-sm text-gray-600">
            {defaultValues ? 'Perbarui informasi produk' : 'Lengkapi informasi produk yang akan ditambahkan'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Product Name */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <Package className="h-4 w-4 mr-2 text-blue-600" />
            Nama Produk
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input 
            {...register("name")}
            placeholder="Masukkan nama produk..."
            className={`border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-white shadow-sm transition-colors ${
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
            }`}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <Tag className="h-4 w-4 mr-2 text-indigo-600" />
            Kategori
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input 
            {...register("category")}
            placeholder="Masukkan kategori produk..."
            className={`border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-white shadow-sm transition-colors ${
              errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
            }`}
          />
        </div>

        {/* Price and Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              Harga (Rp)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              type="number" 
              {...register("price", { valueAsNumber: true })}
              placeholder="0"
              min="1"
              max="999999999"
              className={`border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-white shadow-sm transition-colors ${
                errors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
              }`}
            />
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <BarChart3 className="h-4 w-4 mr-2 text-orange-600" />
              Stok
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              type="number" 
              {...register("stock", { valueAsNumber: true })}
              placeholder="0"
              min="0"
              max="999999"
              className={`border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl h-12 bg-white shadow-sm transition-colors ${
                errors.stock ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
              }`}
            />
          </div>
        </div>


        {/* Submit Button */}
        <div className="pt-6 border-t border-blue-200">
          <Button 
            type="submit" 
            disabled={isLoading || !isValid}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                {defaultValues ? 'Perbarui Produk' : 'Simpan Produk'}
              </>
            )}
          </Button>
          
        </div>
      </form>
    </div>
  );
};

export default ProductForm;