import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request. Please try again.',
  onRetry
}: ErrorScreenProps) {
  const navigate = useNavigate();

  return (
    <div data-ev-id="ev_5d702a1c98" className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div data-ev-id="ev_2acc599c82" className="flex flex-col items-center gap-6 max-w-md text-center animate-fade-in">
        <div data-ev-id="ev_ecd766558a" className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <div data-ev-id="ev_dde77db150">
          <h1 data-ev-id="ev_fe13b4ebb2" className="text-2xl font-bold text-foreground mb-2">{title}</h1>
          <p data-ev-id="ev_83ae346433" className="text-muted-foreground">{message}</p>
        </div>
        <div data-ev-id="ev_505979f45c" className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/')} leftIcon={<Home className="w-4 h-4" />}>
            Go Home
          </Button>
          {onRetry &&
          <Button onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
              Try Again
            </Button>
          }
        </div>
      </div>
    </div>);

}