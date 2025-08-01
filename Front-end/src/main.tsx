import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import "./index.css";
import Routers from "./routes/routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth-context"; 

// Inisialisasi React Query Client
const queryClient = new QueryClient();

// Render aplikasi ke dalam root HTML
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routers />
        {/* 🍞 Sonner Toaster - WAJIB untuk menampilkan toast */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              color: '#374151',
            },
            className: 'my-toast',
            descriptionClassName: 'my-toast-description',
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
