import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ActionModalProvider } from "./context/ActionModal.tsx";
import { AuthProvider } from "./context/jobility/AuthContext.tsx";
import { ErrorProvider } from "./ErrorContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ActionModalProvider>
          <ErrorProvider>
            <App />
          </ErrorProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "12px",
                background: "#fff",
                color: "#333",
                boxShadow: "0 4px 24px 0 rgba(80, 63, 205, 0.15)",
                fontSize: "1rem",
                padding: "16px 24px",
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: "#4f46e5",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </ActionModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
