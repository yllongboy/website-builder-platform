import { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
}

export function Dropdown({ trigger, children, align = 'left' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div data-ev-id="ev_b2c2103cd1" ref={dropdownRef} className="relative inline-block">
      <div data-ev-id="ev_71dfd5e69a" onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen &&
      <div data-ev-id="ev_3c93510256"
      className={`
            absolute z-50 mt-2 min-w-[180px] py-1
            bg-surface border border-border rounded-xl shadow-lg
            animate-slide-down
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}>

          {children}
        </div>
      }
    </div>);

}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
}

export function DropdownItem({ children, onClick, icon, destructive = false, disabled = false }: DropdownItemProps) {
  return (
    <button data-ev-id="ev_230deaee19"
    onClick={onClick}
    disabled={disabled}
    className={`
        w-full flex items-center gap-2 px-3 py-2 text-sm text-left
        transition-colors duration-150
        ${disabled ?
    'opacity-50 cursor-not-allowed' :
    destructive ?
    'text-destructive hover:bg-destructive/10' :
    'text-foreground hover:bg-muted'}
      `
    }>

      {icon && <span data-ev-id="ev_d7c04138cb" className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {children}
    </button>);

}

export function DropdownSeparator() {
  return <div data-ev-id="ev_9d50373158" className="my-1 h-px bg-border" />;
}

interface SelectProps {
  value: string;
  options: {value: string;label: string;}[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Select({ value, options, onChange, placeholder = 'Select...', className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div data-ev-id="ev_dd578c6316" ref={selectRef} className={`relative ${className}`}>
      <button data-ev-id="ev_f9072ef67f"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full h-10 px-3 bg-surface border border-border rounded-lg flex items-center justify-between text-sm transition-all hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-ring">

        <span data-ev-id="ev_03705b13de" className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen &&
      <div data-ev-id="ev_cd096c976e" className="absolute z-50 w-full mt-1 py-1 bg-surface border border-border rounded-lg shadow-lg animate-slide-down">
          {options.map((option) =>
        <button data-ev-id="ev_c3b73d0e7f"
        key={option.value}
        onClick={() => {
          onChange(option.value);
          setIsOpen(false);
        }}
        className={`
                w-full px-3 py-2 text-sm text-left transition-colors
                ${option.value === value ?
        'bg-primary/10 text-primary' :
        'text-foreground hover:bg-muted'}
              `
        }>

              {option.label}
            </button>
        )}
        </div>
      }
    </div>);

}