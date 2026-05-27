import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div data-ev-id="ev_ac51be4aa8" className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div data-ev-id="ev_e2fe73016d" className="flex flex-col items-center gap-6 max-w-md text-center animate-fade-in">
        <div data-ev-id="ev_985f292358" className="relative">
          <div data-ev-id="ev_c097997800" className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-muted-foreground" />
          </div>
          <div data-ev-id="ev_669a40d0f7" className="absolute -top-2 -right-2 text-6xl font-bold text-primary/20">?</div>
        </div>
        <div data-ev-id="ev_8c7a0b6f01">
          <h1 data-ev-id="ev_af3b3f4355" className="text-4xl font-bold text-foreground mb-2">404</h1>
          <p data-ev-id="ev_ca9e189900" className="text-xl font-medium text-foreground mb-2">Page Not Found</p>
          <p data-ev-id="ev_22c32f5c92" className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div data-ev-id="ev_f1c78a958e" className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Go Back
          </Button>
          <Button onClick={() => navigate('/')} leftIcon={<Home className="w-4 h-4" />}>
            Home
          </Button>
        </div>
      </div>
    </div>);

}