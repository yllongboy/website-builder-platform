import { Lock, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router';

interface DisabledFeatureProps {
  feature: string;
  requiredPlan?: string;
  description?: string;
}

export function DisabledFeature({
  feature,
  requiredPlan = 'Pro',
  description = 'This feature is not available on your current plan.'
}: DisabledFeatureProps) {
  const navigate = useNavigate();

  return (
    <div data-ev-id="ev_53bda17a7e" className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div data-ev-id="ev_73314956ed" className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-warning" />
      </div>
      <h3 data-ev-id="ev_e00b80f707" className="text-xl font-semibold text-foreground mb-2">{feature}</h3>
      <p data-ev-id="ev_9593cecc67" className="text-muted-foreground max-w-sm mb-6">{description}</p>
      <Button
        onClick={() => navigate('/billing')}
        leftIcon={<Crown className="w-4 h-4" />}
        rightIcon={<ArrowRight className="w-4 h-4" />}>

        Upgrade to {requiredPlan}
      </Button>
    </div>);

}