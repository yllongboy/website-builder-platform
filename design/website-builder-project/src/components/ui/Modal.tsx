import { useEffect, useRef, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl'
};

export function Modal({ isOpen, onClose, title, description, children, size = 'md', showClose = true }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div data-ev-id="ev_a6daa974be"
    ref={overlayRef}
    onClick={handleOverlayClick}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">

      <div data-ev-id="ev_1dff030c44"
      className={`
          w-full ${sizes[size]} bg-surface rounded-2xl shadow-xl
          animate-scale-in overflow-hidden
        `}>

        {(title || showClose) &&
        <div data-ev-id="ev_c15b47cb84" className="flex items-start justify-between p-6 pb-0">
            <div data-ev-id="ev_977b279fba">
              {title && <h2 data-ev-id="ev_ebb90f7c05" className="text-xl font-semibold text-foreground">{title}</h2>}
              {description && <p data-ev-id="ev_7b38ed300f" className="mt-1 text-sm text-muted-foreground">{description}</p>}
            </div>
            {showClose &&
          <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2 -mt-2">
                <X className="w-5 h-5" />
              </Button>
          }
          </div>
        }
        <div data-ev-id="ev_43067a956c" className="p-6">{children}</div>
      </div>
    </div>);

}