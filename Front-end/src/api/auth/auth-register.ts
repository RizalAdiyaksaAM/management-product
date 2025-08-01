import http from "@/utils/http";
import API_ENDPOINTS from "../api-endpoints";

export interface AuthRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface AuthRegisterResponse {
  data: {
    id: string;
    username: string;
    email: string;
  };
}

export interface AuthErrorResponse {
  response?: {
    data?: {
      meta?: {
        message?: string;
      };
    };
  };
}

// Fungsi untuk register dengan format JSON
const authRegister = async (
  data: AuthRegisterBody
): Promise<AuthRegisterResponse> => {
  try {
    console.log("Sending JSON data to:", API_ENDPOINTS.AUTH_REGISTER);
    console.log("Request data:", data);
    
    const response = await http.post(API_ENDPOINTS.AUTH_REGISTER, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("Registration API response:", response);
    return response.data;
  } catch (error) {
    console.error("Registration API error:", error);

    
    throw error;
  }
};

export { authRegister };