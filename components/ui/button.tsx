// components/ui/button.tsx (continued in the same file)
'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const buttonVariants = cva(
  // Base classes applied to all variants
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:opacity-50 disabled:pointer-events-none',
  // focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
  {
    variants: {
      // Different intents (styles)
      intent: {
        primary: 'bg-brand-700 text-white hover:bg-primary-900',
        // secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
        // danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      // Different sizes
      size: {
        small: 'h-9 px-2 rounded-md',
        medium: 'h-10 py-2 px-4',
        large: 'h-11 px-8 rounded-md',
      },
    },
    // Default variants
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);
// Define the component's props, including the variants
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Create the component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        // Use twMerge to combine the variant classes with any custom classes
        className={twMerge(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };