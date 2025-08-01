// src/services/product-service.ts
import http from "@/utils/http";
import API_ENDPOINTS from "../api-endpoints";

export interface ProductPayload {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface ProductDetail extends ProductPayload {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  current_page: number;
  total_page: number;
  total_data: number;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  name?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
}

export interface ProductResponse {
  status: string;
  message: string;
  data: ProductDetail[]; 
  pagination: Pagination;             
  links: Record<string, string>;  
}



// ==================== CREATE ====================
export const createProduct = async (payload: ProductPayload): Promise<ProductDetail> => {
  try {
    const formData = convertToFormData(payload);

    const { data } = await http.post<ProductDetail>(
      API_ENDPOINTS.CREATE_PRODUCT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

// ==================== GET ALL ====================
export const getAllProducts = async (
  queryParams: ProductQueryParams = {}
): Promise<ProductResponse> => {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const url = `${API_ENDPOINTS.GET_PRODUCT}?${searchParams.toString()}`;

  try {
    const response = await http.get(url);
    return response.data.data; 
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};




// ==================== GET BY ID ====================
export const getProductById = async (id: number): Promise<ProductDetail> => {
  try {
    const endpoint = buildEndpoint(API_ENDPOINTS.GET_PRODUCT_ID, { id });
    const { data } = await http.get<ProductDetail>(endpoint);
    return data;
  } catch (error) {
    console.error(`Failed to fetch product with ID: ${id}`, error);
    throw error;
  }
};

// ==================== UPDATE ====================
export const updateProduct = async (
  id: number,
  payload: ProductPayload
): Promise<ProductDetail> => {
  try {
    const endpoint = buildEndpoint(API_ENDPOINTS.UPDATE_PRODUCT, { id });
    const formData = convertToFormData(payload);

    const { data } = await http.put<ProductDetail>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(`Failed to update product with ID: ${id}`, error);
    throw error;
  }
};


// ==================== DELETE ====================
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const endpoint = buildEndpoint(API_ENDPOINTS.DELETE_PRODUCT, { id });
    await http.delete(endpoint);
  } catch (error) {
    console.error(`Failed to delete product with ID: ${id}`, error);
    throw error;
  }
};

// ==================== UTILITIES ====================
const convertToFormData = (payload: ProductPayload): FormData => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};

const buildEndpoint = (template: string, params: Record<string, string | number>) => {
  let path = template;
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`:${key}`, String(value));
  }
  return path;
};
