import { HTMLAttributes, forwardRef } from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  outline: 'border border-border bg-transparent text-foreground'
};

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm'
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-muted-foreground',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  outline: 'bg-foreground'
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'sm', dot = false, children, ...props }, ref) => {
    return (
      <span data-ev-id="ev_e7fe2e71bc"
      ref={ref}
      className={`
          inline-flex items-center gap-1.5 font-medium rounded-full
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
      {...props}>

        {dot && <span data-ev-id="ev_b48c1a8894" className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
        {children}
      </span>);

  }
);

Badge.displayName = 'Badge';