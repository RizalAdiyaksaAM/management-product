import { Link } from "react-router-dom";
import AuthRegisterForm from "@/components/forms/auth-register-form";

export default function RegisterPage() {
  return (
<div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8 overflow-hidden">
  <div className="absolute inset-0 wave z-0">
    <span className="pointer-events-none"></span>
    <span className="pointer-events-none"></span>
    <span className="pointer-events-none"></span>
  </div>

  <div className="relative z-10 w-full max-w-md">
    <div className="bg-white rounded-t-xl shadow-lg border border-gray-100 p-6 text-center">
      <p className="text-3xl font-bold text-gray-800 mb-2">Register</p>
    </div>

    <div className="bg-white rounded-b-xl shadow-lg border-x border-b border-gray-100 p-6">
      <AuthRegisterForm />

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">atau</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

  );
}
