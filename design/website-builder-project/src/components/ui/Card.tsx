import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const variants = {
  default: 'bg-surface border border-border',
  bordered: 'bg-surface border-2 border-border',
  elevated: 'bg-surface shadow-card',
  glass: 'glass'
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    return (
      <div data-ev-id="ev_0bcd20d3eb"
      ref={ref}
      className={`
          rounded-xl transition-all duration-200
          ${variants[variant]}
          ${paddings[padding]}
          ${hover ? 'hover:shadow-card-hover hover:border-border-hover cursor-pointer' : ''}
          ${className}
        `}
      {...props}>

        {children}
      </div>);

  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) =>
  <div data-ev-id="ev_7c67d2924d" ref={ref} className={`flex flex-col gap-1.5 ${className}`} {...props} />

);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) =>
  <h3 data-ev-id="ev_f566f8a59c" ref={ref} className={`text-lg font-semibold text-foreground ${className}`} {...props} />

);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) =>
  <p data-ev-id="ev_4c1b985b41" ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />

);

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) =>
  <div data-ev-id="ev_2dcde7468a" ref={ref} className={className} {...props} />

);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) =>
  <div data-ev-id="ev_7f98801975" ref={ref} className={`flex items-center pt-4 ${className}`} {...props} />

);

CardFooter.displayName = 'CardFooter';