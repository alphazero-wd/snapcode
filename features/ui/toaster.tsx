"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/features/ui/toast";
import { useToast } from "@/features/ui/use-toast";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-x-2">
              {props.variant === "success" && (
                <CheckCircleIcon className="w-5 h-5" />
              )}
              {props.variant === "error" && (
                <ExclamationCircleIcon className="w-5 h-5" />
              )}
              {props.variant === "warning" && (
                <ExclamationTriangleIcon className="w-5 h-5" />
              )}
              {props.variant === "info" && (
                <InformationCircleIcon className="w-5 h-5" />
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
