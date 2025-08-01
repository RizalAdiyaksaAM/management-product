import http from "@/utils/http";
import Cookies from "js-cookie";
import API_ENDPOINTS from "../api-endpoints";

export interface AuthFetchResponse {
  data: {
    id: number;
    username: string;
    email: string;
  };
}

const authFetch = async (): Promise<AuthFetchResponse> => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Token is not available");
  }

  const endpoint = API_ENDPOINTS.AUTH_FETCH;

  const response = await http.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data;
};


export { authFetch };
