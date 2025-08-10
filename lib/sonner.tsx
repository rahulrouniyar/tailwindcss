
"use client"

import { toast as sonnerToast } from 'sonner';
import { Toast, ToastProps } from "@/components/ui/sonner"


function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      button={toast.button}
      variant={toast.variant}
    />
  ));
}


export { toast }

