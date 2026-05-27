import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { Notification } from '@/types';

interface ToastProps extends Notification {
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const styles = {
  success: 'bg-success/10 border-success/20 text-success',
  error: 'bg-destructive/10 border-destructive/20 text-destructive',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  info: 'bg-primary/10 border-primary/20 text-primary'
};

export function Toast({ type, message, description, onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div data-ev-id="ev_c165fc67a6"
    className={`
        flex items-start gap-3 p-4 rounded-xl border shadow-lg
        transition-all duration-200
        ${styles[type]}
        ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-2'}
      `}>

      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div data-ev-id="ev_f0e396e4f0" className="flex-1 min-w-0">
        <p data-ev-id="ev_538202e77c" className="font-medium text-foreground">{message}</p>
        {description && <p data-ev-id="ev_d58d74100f" className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <button data-ev-id="ev_ae4d4c3b05" onClick={onClose} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>);

}

interface ToastContainerProps {
  toasts: Notification[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div data-ev-id="ev_16f20b1132" className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) =>
      <Toast key={toast.id} {...toast} onClose={() => onRemove(toast.id)} />
      )}
    </div>);

}