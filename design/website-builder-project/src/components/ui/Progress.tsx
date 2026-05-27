interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  showLabel?: boolean;
  className?: string;
}

const sizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

const variants = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive'
};

export function Progress({ value, max = 100, size = 'md', variant = 'default', showLabel = false, className = '' }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value / max * 100));

  return (
    <div data-ev-id="ev_801e1ac8db" className={`flex items-center gap-3 ${className}`}>
      <div data-ev-id="ev_18c07d279b" className={`flex-1 bg-muted rounded-full overflow-hidden ${sizes[size]}`}>
        <div data-ev-id="ev_e98c0f5af3"
        className={`h-full rounded-full transition-all duration-500 ease-out ${variants[variant]}`}
        style={{ width: `${percentage}%` }} />

      </div>
      {showLabel &&
      <span data-ev-id="ev_1fdcd1a951" className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right">
          {Math.round(percentage)}%
        </span>
      }
    </div>);

}