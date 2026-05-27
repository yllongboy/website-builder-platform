import { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div data-ev-id="ev_5ed81ab524" className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div data-ev-id="ev_efa3a8f22b" className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-6">
        {icon}
      </div>
      <h3 data-ev-id="ev_9cf8da52cb" className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p data-ev-id="ev_3c7c7f1594" className="text-muted-foreground max-w-sm mb-6">{description}</p>
      <div data-ev-id="ev_2214d19b1b" className="flex flex-col sm:flex-row gap-3">
        {action &&
        <Button onClick={action.onClick}>{action.label}</Button>
        }
        {secondaryAction &&
        <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        }
      </div>
    </div>);

}