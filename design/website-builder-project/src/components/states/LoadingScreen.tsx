import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div data-ev-id="ev_fa65ebbf96" className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div data-ev-id="ev_d1b4c219bf" className="flex flex-col items-center gap-4 animate-fade-in">
        <div data-ev-id="ev_16ab147f0a" className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p data-ev-id="ev_5bf4620fe3" className="text-foreground-secondary font-medium">{message}</p>
      </div>
    </div>);

}