import { useState } from 'react';
import {
  Check,
  CreditCard,
  Calendar,
  Receipt,
  ArrowRight,
  Crown,
  Sparkles,
  Zap,
  Shield,
  Download } from
'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { Modal } from '@/components/ui/Modal';
import { mockPlans } from '@/data/mockData';

export default function Billing() {
  const [isYearly, setIsYearly] = useState(true);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const currentPlan = mockPlans.find((p) => p.isCurrent);
  const savings = currentPlan ? currentPlan.price.monthly * 12 - currentPlan.price.yearly : 0;

  const invoices = [
  { id: 'INV-001', date: 'Jan 15, 2024', amount: '$19.00', status: 'paid' },
  { id: 'INV-002', date: 'Dec 15, 2023', amount: '$19.00', status: 'paid' },
  { id: 'INV-003', date: 'Nov 15, 2023', amount: '$19.00', status: 'paid' }];


  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setUpgradeModal(true);
  };

  return (
    <AppLayout>
      <div data-ev-id="ev_0a726b239c" className="max-w-5xl mx-auto flex flex-col gap-8 animate-fade-in">
        {/* Header */}
        <div data-ev-id="ev_891909125d">
          <h1 data-ev-id="ev_d50555a423" className="text-3xl font-bold text-foreground">Billing & Subscription</h1>
          <p data-ev-id="ev_740880754a" className="text-foreground-secondary mt-1">Manage your subscription and payment details</p>
        </div>

        {/* Current Plan Card */}
        <Card variant="elevated" padding="lg" className="relative overflow-hidden">
          <div data-ev-id="ev_1fc04c6c8d" className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="relative">
            <div data-ev-id="ev_3033cc168e" className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div data-ev-id="ev_08bb872f22" className="flex items-start gap-4">
                <div data-ev-id="ev_0700ab7038" className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div data-ev-id="ev_4f93c461aa">
                  <div data-ev-id="ev_653e1998ab" className="flex items-center gap-2 mb-1">
                    <h2 data-ev-id="ev_6084a9f423" className="text-xl font-bold text-foreground">Pro Plan</h2>
                    <Badge variant="primary">Current Plan</Badge>
                  </div>
                  <p data-ev-id="ev_f286483f71" className="text-muted-foreground mb-3">
                    You're on the Pro plan, billed yearly. Your next billing date is January 15, 2025.
                  </p>
                  <div data-ev-id="ev_fdfd946865" className="flex items-center gap-4">
                    <div data-ev-id="ev_eba706f9a1" className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span data-ev-id="ev_2d31559f50" className="text-foreground">**** 4242</span>
                    </div>
                    <div data-ev-id="ev_37af9161cb" className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span data-ev-id="ev_dfc1dd7bcd" className="text-foreground">Renews Jan 15, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              <div data-ev-id="ev_773d4eca21" className="flex flex-col items-start lg:items-end gap-2">
                <div data-ev-id="ev_26d9096965" className="flex items-baseline gap-1">
                  <span data-ev-id="ev_fde7004e27" className="text-4xl font-bold text-foreground">$190</span>
                  <span data-ev-id="ev_0eef8911d1" className="text-muted-foreground">/year</span>
                </div>
                <Badge variant="success" size="md">
                  Saving $38/year
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div data-ev-id="ev_597f249b93">
          <div data-ev-id="ev_b22b4b92a5" className="flex items-center justify-between mb-6">
            <h2 data-ev-id="ev_625f977c6b" className="text-xl font-semibold text-foreground">Available Plans</h2>
            <div data-ev-id="ev_fe97821020" className="flex items-center gap-3">
              <span data-ev-id="ev_edd2342300" className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Toggle checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
              <span data-ev-id="ev_8cf258f011" className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly &&
              <Badge variant="success" size="sm">Save 20%</Badge>
              }
            </div>
          </div>

          <div data-ev-id="ev_6c9b068acf" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPlans.map((plan) => {
              const price = isYearly ? plan.price.yearly : plan.price.monthly;
              const period = isYearly ? '/year' : '/month';
              const isCurrent = plan.isCurrent;

              return (
                <Card
                  key={plan.id}
                  variant={plan.isPopular ? 'elevated' : 'bordered'}
                  padding="lg"
                  className={`relative ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}>

                  {plan.isPopular &&
                  <div data-ev-id="ev_2225975e7a" className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary" className="gradient-primary text-white border-0 shadow-glow">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  }

                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div data-ev-id="ev_70936a627f" className="flex items-baseline gap-1 mt-2">
                      <span data-ev-id="ev_a66b9533b1" className="text-3xl font-bold text-foreground">
                        ${price === 0 ? 'Free' : price}
                      </span>
                      {price > 0 && <span data-ev-id="ev_633efd2bb5" className="text-muted-foreground">{period}</span>}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <ul data-ev-id="ev_c77a1ea1a3" className="flex flex-col gap-2">
                      {plan.features.map((feature, i) =>
                      <li data-ev-id="ev_27090ce035" key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span data-ev-id="ev_f057b4abc1" className="text-foreground-secondary">{feature}</span>
                        </li>
                      )}
                    </ul>

                    <Button
                      variant={isCurrent ? 'outline' : plan.isPopular ? 'primary' : 'secondary'}
                      className="w-full mt-2"
                      disabled={isCurrent}
                      onClick={() => !isCurrent && handleSelectPlan(plan.id)}>

                      {isCurrent ? 'Current Plan' : plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                    </Button>
                  </CardContent>
                </Card>);

            })}
          </div>
        </div>

        {/* Features Comparison */}
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Why Upgrade to Pro?</CardTitle>
            <CardDescription>Unlock premium features to supercharge your websites</CardDescription>
          </CardHeader>
          <CardContent>
            <div data-ev-id="ev_10a5296ac4" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              {[
              { icon: Zap, title: 'Faster Publishing', description: 'Priority CDN deployment' },
              { icon: Shield, title: 'SSL Included', description: 'Free SSL certificates' },
              { icon: Crown, title: 'Premium Templates', description: 'Access 50+ exclusive designs' },
              { icon: Sparkles, title: 'No Branding', description: 'Remove SiteForge badge' }].
              map((feature, i) =>
              <div data-ev-id="ev_ffe4f123f2" key={i} className="flex items-start gap-3">
                  <div data-ev-id="ev_435d28c3a4" className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div data-ev-id="ev_6cb7672b08">
                    <p data-ev-id="ev_8aac0719ff" className="font-medium text-foreground">{feature.title}</p>
                    <p data-ev-id="ev_48ab12b16a" className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <div data-ev-id="ev_8973accc03" className="flex items-center justify-between">
              <div data-ev-id="ev_c5020cd3ce">
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </div>
              <Button variant="outline" size="sm" leftIcon={<Receipt className="w-4 h-4" />}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div data-ev-id="ev_324ee6b538" className="flex flex-col divide-y divide-border">
              {invoices.map((invoice) =>
              <div data-ev-id="ev_999ce90e83" key={invoice.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div data-ev-id="ev_4cc420908d" className="flex items-center gap-4">
                    <div data-ev-id="ev_a3d589af17" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div data-ev-id="ev_d063702db4">
                      <p data-ev-id="ev_1c09487052" className="font-medium text-foreground">{invoice.id}</p>
                      <p data-ev-id="ev_e80f0c556e" className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div data-ev-id="ev_1f2b85d364" className="flex items-center gap-4">
                    <Badge variant="success" size="sm">Paid</Badge>
                    <span data-ev-id="ev_808ce30f68" className="font-medium text-foreground">{invoice.amount}</span>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card variant="bordered" padding="lg" className="border-destructive/30">
          <CardContent>
            <div data-ev-id="ev_591b60b9fc" className="flex items-center justify-between">
              <div data-ev-id="ev_da62c1d3ae">
                <h3 data-ev-id="ev_f3b186ef54" className="font-semibold text-foreground">Cancel Subscription</h3>
                <p data-ev-id="ev_465f4be6fc" className="text-sm text-muted-foreground mt-1">
                  Your subscription will remain active until the end of the current billing period.
                </p>
              </div>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                Cancel Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Modal */}
        <Modal
          isOpen={upgradeModal}
          onClose={() => setUpgradeModal(false)}
          title="Confirm Plan Change">

          <div data-ev-id="ev_2a0c4c3b06" className="flex flex-col gap-4">
            <p data-ev-id="ev_8a346ae1d8" className="text-muted-foreground">
              You're about to change your plan to <strong data-ev-id="ev_4bcd524acd" className="text-foreground">{selectedPlan}</strong>. 
              Your new plan will take effect immediately.
            </p>
            <div data-ev-id="ev_0520a7d9b2" className="flex gap-3">
              <Button variant="outline" onClick={() => setUpgradeModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setUpgradeModal(false)} className="flex-1">
                Confirm Change
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>);

}