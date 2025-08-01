// Enhanced ProductTableRow.tsx
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Package, TrendingUp, TrendingDown } from "lucide-react";
import type { ProductDetail} from "@/api/product/service-product";

interface ProductTableRowProps {
  product: ProductDetail;
  index?: number;
  onView?: (product: ProductDetail) => void;
  onEdit?: (product: ProductDetail) => void;
  onDelete?: (product: ProductDetail) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  index = 0,
  onView,
  onEdit,
  onDelete,
}) => {
  // Function to get stock status color and icon
  const getStockStatus = (stock: number) => {
    if (stock > 20) {
      return {
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: TrendingUp,
        text: "Stok Baik"
      };
    } else if (stock > 5) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        icon: Package,
        text: "Stok Terbatas"
      };
    } else {
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: TrendingDown,
        text: "Stok Rendah"
      };
    }
  };

  const stockStatus = getStockStatus(product.stock);
  const StockIcon = stockStatus.icon;

  return (
    <TableRow 
      className={`
        hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
        transition-all duration-200 border-b border-gray-100
        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
      `}
    >
      <TableCell className="py-6 px-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-base">{product.name}</div>
            <div className="text-sm text-gray-500">ID: {product.id}</div>
          </div>
        </div>
      </TableCell>
      
      <TableCell className="py-6 px-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
          {product.category}
        </span>
      </TableCell>
      
      <TableCell className="py-6 px-6">
        <div className="text-lg font-bold text-gray-900">
          Rp {product.price.toLocaleString("id-ID")}
        </div>
        <div className="text-sm text-gray-500">Per unit</div>
      </TableCell>
      
      <TableCell className="py-6 px-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${stockStatus.bgColor}`}>
            <StockIcon className={`h-4 w-4 ${stockStatus.color}`} />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{product.stock} unit</div>
            <div className={`text-xs font-medium ${stockStatus.color}`}>
              {stockStatus.text}
            </div>
          </div>
        </div>
      </TableCell>
      
      <TableCell className="py-6 px-6">
        <div className="flex justify-end !space-x-4">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onView?.(product)}
            className="hover:bg-blue-100 hover:text-blue-700 !p-2 rounded-xl transition-all duration-200"
          >
            <Eye className="!h-4 !w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onEdit?.(product)}
            className="hover:bg-yellow-100 hover:text-yellow-700 !p-2 rounded-xl transition-all duration-200"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete?.(product)}
            className="hover:bg-red-100 hover:text-red-700 !p-2 rounded-xl transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;