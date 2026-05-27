import { forwardRef, InputHTMLAttributes } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className = '', label, description, id, checked, onChange, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <label data-ev-id="ev_d1b4635646" htmlFor={toggleId} className={`flex items-center gap-3 cursor-pointer ${className}`}>
        <div data-ev-id="ev_b50f63259d" className="relative">
          <input data-ev-id="ev_a82d76a9bd"
          ref={ref}
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props} />

          <div data-ev-id="ev_3b2226392f" className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors duration-200" />
          <div data-ev-id="ev_645d235010" className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
        </div>
        {(label || description) &&
        <div data-ev-id="ev_b840943145" className="flex flex-col">
            {label && <span data-ev-id="ev_9dec687f0c" className="text-sm font-medium text-foreground">{label}</span>}
            {description && <span data-ev-id="ev_09cf48f598" className="text-xs text-muted-foreground">{description}</span>}
          </div>
        }
      </label>);

  }
);

Toggle.displayName = 'Toggle';