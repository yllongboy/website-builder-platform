import { InputHTMLAttributes, forwardRef } from 'react';
import { Search } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSearch?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, hint, leftIcon, rightIcon, isSearch, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div data-ev-id="ev_62e8aa69bb" className="flex flex-col gap-1.5">
        {label &&
        <label data-ev-id="ev_b6daeb5d1f" htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        }
        <div data-ev-id="ev_1e1b6c308e" className="relative">
          {(leftIcon || isSearch) &&
          <div data-ev-id="ev_11c1466f88" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {isSearch ? <Search className="w-4 h-4" /> : leftIcon}
            </div>
          }
          <input data-ev-id="ev_4237235e14"
          ref={ref}
          id={inputId}
          className={`
              w-full h-10 px-3 bg-surface border border-border rounded-lg
              text-foreground placeholder:text-muted-foreground
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon || isSearch ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-destructive focus:ring-destructive' : ''}
              ${className}
            `}
          {...props} />

          {rightIcon &&
          <div data-ev-id="ev_62b5418bdd" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          }
        </div>
        {hint && !error &&
        <p data-ev-id="ev_8a5d0298cb" className="text-xs text-muted-foreground">{hint}</p>
        }
        {error &&
        <p data-ev-id="ev_ca257f8ba3" className="text-xs text-destructive">{error}</p>
        }
      </div>);

  }
);

Input.displayName = 'Input';