"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast as sonnerToast } from "sonner"
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ToasterProps = React.ComponentProps<typeof Sonner>

type ToastVariant = 'success' | 'warning' | 'information';

interface ToastProps extends VariantProps<typeof toastContainer> {
  id: string | number;
  title: string;
  description: string;
  variant?: ToastVariant;
  button: {
    label: string;
    onClick: () => void;
  };
}
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // toastOptions={{
      //   classNames: {
      //     toast:
      //       "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      //     description: "group-[.toast]:text-muted-foreground",
      //     actionButton:
      //       "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      //     cancelButton:
      //       "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      //     success:
      //     "group-[.toaster]:bg-green-300 group-[.toaster]:text-grey-100-foreground group-[.toaster]:border-green-500" ,
      //     error:
      //     "group-[.toaster]:bg-red-300 group-[.toaster]:text-grey-100",
      //   },
      // }}
      {...props}
    />
  )
}

// Define variants using cva
const toastContainer = cva(
  'flex rounded-lg shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4',
  {
    variants: {
      variant: {
        success: 'bg-green-50 text-green-800',
        warning: 'bg-yellow-50 text-yellow-800',
        information: 'bg-blue-50 text-blue-800',
      },
    },
    defaultVariants: {
      variant: 'information',
    },
  }
);

/** Abstracted toast function */
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

/** A fully custom toast that supports variants */
function Toast(props: ToastProps) {
  const { title, description, button, id, variant = 'information' } = props;

  return (
    <div className={cn(toastContainer({ variant }))}>
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-sm">{description}</p>
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md text-sm font-medium">
        <button
          className="rounded bg-white px-3 py-1 text-sm font-semibold text-current hover:bg-gray-100"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </button>
      </div>
    </div>
  );
}

export { Toaster, Toast }
export type { ToastProps }
