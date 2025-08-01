import { createBrowserRouter, RouterProvider } from "react-router-dom";


import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import ProtectedRoute from "@/routes/protected-route"; // pastikan path sesuai
import Dashboard from "@/pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-lg text-gray-600">404 | Halaman tidak ditemukan</p>
      </div>
    ),
  },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
