import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm',
  secondary: 'bg-muted text-foreground hover:bg-surface-active',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-red-600 shadow-sm',
  success: 'bg-success text-success-foreground hover:bg-emerald-600 shadow-sm'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  icon: 'h-10 w-10 p-0'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button data-ev-id="ev_0ce087a0e5"
      ref={ref}
      disabled={disabled || isLoading}
      className={`
          inline-flex items-center justify-center font-medium rounded-lg
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
      {...props}>

        {isLoading ?
        <svg data-ev-id="ev_b17934d3ec" className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle data-ev-id="ev_8d5c61636c" className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path data-ev-id="ev_95c44ec705" className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg> :

        <>
            {leftIcon && <span data-ev-id="ev_045b1a0a4e" className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span data-ev-id="ev_bc7fd94263" className="flex-shrink-0">{rightIcon}</span>}
          </>
        }
      </button>);

  }
);

Button.displayName = 'Button';