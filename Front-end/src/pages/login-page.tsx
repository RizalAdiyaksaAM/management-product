import { Link } from "react-router-dom";
import AuthLoginForm from "@/components/forms/auth-login-form";

export default function LoginPage() {
  return (
<div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
  <div className="absolute inset-0 wave z-0">
    <span className="pointer-events-none"></span>
    <span className="pointer-events-none"></span>
    <span className="pointer-events-none"></span>
  </div>
  
  <div className="relative z-10 w-full max-w-md">
    <div className="bg-white rounded-t-xl shadow-lg border border-gray-100 p-6 text-center">
      <p className="text-3xl font-bold text-gray-800 mb-2">Login</p>
    </div>

    <div className="bg-white rounded-b-xl shadow-lg border-x border-b border-gray-100 p-6">
      <AuthLoginForm />

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">atau</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/auth/register"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

  );
}