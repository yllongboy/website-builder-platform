import { useState, useEffect } from 'react';
import { Rocket, Check, Copy, ExternalLink, AlertCircle, Loader2, Globe } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Input } from '@/components/ui/Input';

type PublishState = 'confirm' | 'publishing' | 'success' | 'error';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteName: string;
}

export function PublishModal({ isOpen, onClose, websiteName }: PublishModalProps) {
  const [state, setState] = useState<PublishState>('confirm');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [customSubdomain, setCustomSubdomain] = useState(websiteName.toLowerCase().replace(/\s+/g, '-'));

  const publishedUrl = `https://${customSubdomain}.siteforge.io`;

  useEffect(() => {
    if (state === 'publishing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState('success'), 500);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setState('confirm');
        setProgress(0);
        setCopied(false);
      }, 300);
    }
  }, [isOpen]);

  const handlePublish = () => {
    setState('publishing');
  };

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = publishedUrl;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      {state === 'confirm' &&
      <div data-ev-id="ev_3d4aa751c5" className="flex flex-col items-center text-center">
          <div data-ev-id="ev_02ce90c732" className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 data-ev-id="ev_7cd9688415" className="text-2xl font-bold text-foreground mb-2">Publish Your Website</h2>
          <p data-ev-id="ev_3cdf6f80f5" className="text-muted-foreground mb-6">
            Your website will be live at the URL below. You can change this anytime.
          </p>

          <div data-ev-id="ev_11542f6f36" className="w-full mb-6">
            <label data-ev-id="ev_26eaa1ae7e" className="block text-sm font-medium text-foreground mb-2 text-left">Website URL</label>
            <div data-ev-id="ev_5976077eb2" className="flex items-center gap-2">
              <div data-ev-id="ev_f18da21533" className="flex-1 flex items-center bg-muted rounded-lg overflow-hidden border border-border">
                <span data-ev-id="ev_f5b11731dd" className="px-3 py-2.5 text-sm text-muted-foreground bg-surface-active border-r border-border">
                  https://
                </span>
                <input data-ev-id="ev_7ded9ba685"
              type="text"
              value={customSubdomain}
              onChange={(e) => setCustomSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="flex-1 px-3 py-2.5 text-sm bg-transparent border-none outline-none" />

                <span data-ev-id="ev_e1108eed96" className="px-3 py-2.5 text-sm text-muted-foreground">
                  .siteforge.io
                </span>
              </div>
            </div>
          </div>

          <div data-ev-id="ev_d016b34db3" className="flex gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handlePublish} className="flex-1" leftIcon={<Rocket className="w-4 h-4" />}>
              Publish Now
            </Button>
          </div>
        </div>
      }

      {state === 'publishing' &&
      <div data-ev-id="ev_4c69cf51b7" className="flex flex-col items-center text-center py-8">
          <div data-ev-id="ev_7899b6202f" className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h2 data-ev-id="ev_59d63c1790" className="text-2xl font-bold text-foreground mb-2">Publishing...</h2>
          <p data-ev-id="ev_9e65d319ce" className="text-muted-foreground mb-8">
            We're deploying your website to the world. This usually takes a few seconds.
          </p>
          <Progress value={Math.min(progress, 100)} size="lg" className="w-full max-w-xs" showLabel />
          <p data-ev-id="ev_a3ada5ea35" className="text-sm text-muted-foreground mt-4">
            {progress < 30 && 'Preparing files...'}
            {progress >= 30 && progress < 60 && 'Optimizing assets...'}
            {progress >= 60 && progress < 90 && 'Deploying to edge network...'}
            {progress >= 90 && 'Almost there...'}
          </p>
        </div>
      }

      {state === 'success' &&
      <div data-ev-id="ev_f7f243f599" className="flex flex-col items-center text-center animate-scale-in">
          <div data-ev-id="ev_e51c946409" className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h2 data-ev-id="ev_6bbc018860" className="text-2xl font-bold text-foreground mb-2">🎉 Published!</h2>
          <p data-ev-id="ev_f90feb628a" className="text-muted-foreground mb-6">
            Your website is now live and accessible to everyone.
          </p>

          <div data-ev-id="ev_e98508fa6c" className="w-full p-4 bg-muted rounded-xl mb-6">
            <div data-ev-id="ev_892d5647ab" className="flex items-center gap-3">
              <div data-ev-id="ev_c551104bc7" className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-success" />
              </div>
              <div data-ev-id="ev_57260963de" className="flex-1 text-left">
                <p data-ev-id="ev_fb87654abf" className="text-sm text-muted-foreground">Your website URL</p>
                <p data-ev-id="ev_c9aefe82c9" className="font-medium text-foreground">{publishedUrl}</p>
              </div>
              <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className={copied ? 'text-success border-success' : ''}>

                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div data-ev-id="ev_1125232601" className="flex gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
            onClick={() => window.open(publishedUrl, '_blank')}
            className="flex-1"
            leftIcon={<ExternalLink className="w-4 h-4" />}>

              View Website
            </Button>
          </div>
        </div>
      }

      {state === 'error' &&
      <div data-ev-id="ev_fd619344d3" className="flex flex-col items-center text-center">
          <div data-ev-id="ev_e954e8eb69" className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 data-ev-id="ev_e595d79d26" className="text-2xl font-bold text-foreground mb-2">Publication Failed</h2>
          <p data-ev-id="ev_a354b95137" className="text-muted-foreground mb-6">
            Something went wrong while publishing your website. Please try again.
          </p>

          <div data-ev-id="ev_cd1389be19" className="w-full p-4 bg-destructive/5 border border-destructive/20 rounded-xl mb-6">
            <p data-ev-id="ev_dc3c383009" className="text-sm text-destructive">
              Error: Unable to connect to deployment server. Please check your connection and try again.
            </p>
          </div>

          <div data-ev-id="ev_14017ceafd" className="flex gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handlePublish} className="flex-1">
              Try Again
            </Button>
          </div>
        </div>
      }
    </Modal>);

}