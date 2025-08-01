import http from "@/utils/http";
import API_ENDPOINTS from "../api-endpoints";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";

export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  data: {
    username: string;
    email: string;
    token: string;
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

const authLogin = async (data: AuthLoginBody): Promise<AuthLoginResponse> => {
  const response = await http.post(API_ENDPOINTS.AUTH_LOGIN, data);
  return response.data;
};

const useAuthLoginMutation = (): UseMutationResult<
  AuthLoginResponse,
  AuthErrorResponse,
  AuthLoginBody
> => {
  return useMutation<AuthLoginResponse, AuthErrorResponse, AuthLoginBody>({
    mutationFn: authLogin,
  });
};

export { useAuthLoginMutation };
