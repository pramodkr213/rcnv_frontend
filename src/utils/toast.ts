import toast from "react-hot-toast";
import type { ToastOptions } from "react-hot-toast";

export const ToastMessage = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, options),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, options),

  promise: <T>(
    promise: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    options?: ToastOptions
  ) => toast.promise(promise, msgs, options),
};
