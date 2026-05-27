import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  LayoutTemplate,
  Wand2,
  Check,
  Briefcase,
  Camera,
  ShoppingBag,
  PenTool,
  Rocket,
  Coffee,
  Building,
  Palette,
  Globe,
  Users,
  Mail,
  Target,
  Zap,
  Crown } from
'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { mockTemplates } from '@/data/mockData';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'choose-path' | 'templates' | 'questionnaire' | 'website-type' | 'website-goal' | 'style-preference' | 'website-name' | 'complete';

interface QuestionnaireData {
  websiteType: string;
  websiteGoal: string;
  stylePreference: string;
  websiteName: string;
}

const websiteTypes = [
{ id: 'portfolio', label: 'Portfolio', icon: Camera, description: 'Showcase your work and skills' },
{ id: 'business', label: 'Business', icon: Briefcase, description: 'Promote your company or service' },
{ id: 'ecommerce', label: 'Online Store', icon: ShoppingBag, description: 'Sell products online' },
{ id: 'blog', label: 'Blog', icon: PenTool, description: 'Share your thoughts and stories' },
{ id: 'startup', label: 'Startup / SaaS', icon: Rocket, description: 'Launch your product or app' },
{ id: 'restaurant', label: 'Restaurant / Cafe', icon: Coffee, description: 'Food & hospitality business' },
{ id: 'agency', label: 'Agency', icon: Building, description: 'Creative or digital agency' },
{ id: 'other', label: 'Something else', icon: Globe, description: 'Custom website type' }];


const websiteGoals = [
{ id: 'leads', label: 'Generate Leads', icon: Users, description: 'Capture potential customers' },
{ id: 'showcase', label: 'Showcase Work', icon: Palette, description: 'Display portfolio or projects' },
{ id: 'sell', label: 'Sell Products', icon: ShoppingBag, description: 'E-commerce and sales' },
{ id: 'inform', label: 'Inform Visitors', icon: Mail, description: 'Share information and news' },
{ id: 'brand', label: 'Build Brand', icon: Target, description: 'Establish brand presence' },
{ id: 'engage', label: 'Engage Community', icon: Zap, description: 'Build an audience' }];


const stylePreferences = [
{ id: 'minimal', label: 'Minimal & Clean', colors: ['#ffffff', '#000000', '#6366f1'], description: 'Simple, elegant, lots of whitespace' },
{ id: 'bold', label: 'Bold & Vibrant', colors: ['#ef4444', '#f59e0b', '#10b981'], description: 'Eye-catching colors, strong typography' },
{ id: 'professional', label: 'Professional', colors: ['#1e293b', '#3b82f6', '#64748b'], description: 'Corporate, trustworthy, structured' },
{ id: 'creative', label: 'Creative & Playful', colors: ['#8b5cf6', '#ec4899', '#06b6d4'], description: 'Unique layouts, artistic elements' },
{ id: 'dark', label: 'Dark & Modern', colors: ['#0f172a', '#6366f1', '#22d3ee'], description: 'Dark theme, sleek design' },
{ id: 'warm', label: 'Warm & Friendly', colors: ['#fef3c7', '#f97316', '#84cc16'], description: 'Inviting, approachable, natural' }];


export default function GetStarted() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<Step>('choose-path');
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireData>({
    websiteType: '',
    websiteGoal: '',
    stylePreference: '',
    websiteName: ''
  });

  const totalSteps = 5;
  const currentStepNumber = {
    'choose-path': 1,
    'templates': 2,
    'questionnaire': 1,
    'website-type': 2,
    'website-goal': 3,
    'style-preference': 4,
    'website-name': 5,
    'complete': 5
  }[step];

  const handleChoosePath = (path: 'templates' | 'questionnaire') => {
    if (path === 'templates') {
      setStep('templates');
    } else {
      setStep('website-type');
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinueWithTemplate = () => {
    if (!isAuthenticated) {
      setAuthModal('signup');
    } else {
      navigate(`/editor/new?template=${selectedTemplate}`);
    }
  };

  const handleQuestionnaireNext = () => {
    const stepOrder: Step[] = ['website-type', 'website-goal', 'style-preference', 'website-name', 'complete'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleQuestionnaireBack = () => {
    const stepOrder: Step[] = ['choose-path', 'website-type', 'website-goal', 'style-preference', 'website-name'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleComplete = () => {
    if (!isAuthenticated) {
      setAuthModal('signup');
    } else {
      // Find matching template based on questionnaire
      const matchingTemplate = mockTemplates.find((t) => t.category === questionnaire.websiteType) || mockTemplates[0];
      navigate(`/editor/new?template=${matchingTemplate.id}&name=${encodeURIComponent(questionnaire.websiteName)}`);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 'website-type':return !!questionnaire.websiteType;
      case 'website-goal':return !!questionnaire.websiteGoal;
      case 'style-preference':return !!questionnaire.stylePreference;
      case 'website-name':return questionnaire.websiteName.length >= 2;
      default:return true;
    }
  };

  return (
    <div data-ev-id="ev_463b08fa47" className="min-h-screen bg-background">
      {/* Header */}
      <header data-ev-id="ev_a614fedde7" className="border-b border-border bg-surface/80 backdrop-blur-lg sticky top-0 z-50">
        <div data-ev-id="ev_5089d30fde" className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button data-ev-id="ev_da57be1aaf" onClick={() => navigate('/landing')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div data-ev-id="ev_f9680007b2" className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span data-ev-id="ev_8e58415d5d" className="font-bold text-lg text-foreground">SiteForge</span>
          </button>

          {step !== 'choose-path' && step !== 'templates' &&
          <div data-ev-id="ev_1966d35a91" className="flex items-center gap-4">
              <span data-ev-id="ev_a44f837484" className="text-sm text-muted-foreground">Step {currentStepNumber} of {totalSteps}</span>
              <Progress value={currentStepNumber / totalSteps * 100} className="w-32" />
            </div>
          }

          {!isAuthenticated &&
          <Button variant="ghost" onClick={() => setAuthModal('login')}>
              Log In
            </Button>
          }
        </div>
      </header>

      <main data-ev-id="ev_6e1b0655eb" className="max-w-5xl mx-auto px-4 py-12">
        {/* Step: Choose Path */}
        {step === 'choose-path' &&
        <div data-ev-id="ev_71fc6225cb" className="animate-fade-in">
            <div data-ev-id="ev_d2e72de26d" className="text-center mb-12">
              <Badge variant="primary" size="md" className="mb-4">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Let's get started
              </Badge>
              <h1 data-ev-id="ev_bc0e6c7bc6" className="text-4xl font-bold text-foreground mb-4">How would you like to begin?</h1>
              <p data-ev-id="ev_92e990cca7" className="text-xl text-muted-foreground max-w-xl mx-auto">
                Choose your path to create your perfect website
              </p>
            </div>

            <div data-ev-id="ev_6f75110d57" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Card
              hover
              padding="lg"
              className="cursor-pointer group"
              onClick={() => handleChoosePath('templates')}>

                <CardContent className="text-center">
                  <div data-ev-id="ev_e4e5723d36" className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <LayoutTemplate className="w-8 h-8 text-primary" />
                  </div>
                  <h3 data-ev-id="ev_e072cf4b6e" className="text-xl font-semibold text-foreground mb-2">Browse Templates</h3>
                  <p data-ev-id="ev_49f4c7748d" className="text-muted-foreground mb-4">
                    Choose from 50+ professionally designed templates and customize them to fit your needs.
                  </p>
                  <Badge variant="secondary">Quick start</Badge>
                </CardContent>
              </Card>

              <Card
              hover
              padding="lg"
              className="cursor-pointer group"
              onClick={() => handleChoosePath('questionnaire')}>

                <CardContent className="text-center">
                  <div data-ev-id="ev_d686515ba6" className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Wand2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 data-ev-id="ev_5c5aea48be" className="text-xl font-semibold text-foreground mb-2">Guided Setup</h3>
                  <p data-ev-id="ev_01b4775bbd" className="text-muted-foreground mb-4">
                    Answer a few questions and we'll recommend the perfect template and settings for you.
                  </p>
                  <Badge variant="primary">Recommended</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        }

        {/* Step: Templates */}
        {step === 'templates' &&
        <div data-ev-id="ev_82523b7b32" className="animate-fade-in">
            <div data-ev-id="ev_07b4ec33b4" className="flex items-center justify-between mb-8">
              <div data-ev-id="ev_f6ded333ea">
                <Button variant="ghost" size="sm" onClick={() => setStep('choose-path')} className="mb-2">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <h1 data-ev-id="ev_3dee675766" className="text-3xl font-bold text-foreground">Choose a template</h1>
                <p data-ev-id="ev_656893eb38" className="text-muted-foreground mt-1">Select a template to get started</p>
              </div>
              {selectedTemplate &&
            <Button onClick={handleContinueWithTemplate}>
                  Continue with Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            }
            </div>

            <div data-ev-id="ev_cc4326dcde" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTemplates.map((template) =>
            <Card
              key={template.id}
              hover
              padding="none"
              className={`cursor-pointer overflow-hidden transition-all ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`
              }
              onClick={() => handleSelectTemplate(template.id)}>

                  <div data-ev-id="ev_71ff78e987" className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <img data-ev-id="ev_9f88d1425d"
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover" />

                    {template.isPremium &&
                <div data-ev-id="ev_7b24c8bdf5" className="absolute top-3 left-3">
                        <Badge variant="warning" className="bg-amber-500 text-white border-0">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      </div>
                }
                    {selectedTemplate === template.id &&
                <div data-ev-id="ev_24f5bcbfaa" className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div data-ev-id="ev_0203bff471" className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                }
                  </div>
                  <CardContent className="p-4">
                    <h3 data-ev-id="ev_68c5bf96a9" className="font-semibold text-foreground">{template.name}</h3>
                    <p data-ev-id="ev_7cb6c95163" className="text-sm text-muted-foreground capitalize">{template.category}</p>
                  </CardContent>
                </Card>
            )}
            </div>
          </div>
        }

        {/* Step: Website Type */}
        {step === 'website-type' &&
        <div data-ev-id="ev_6f32f076cd" className="animate-fade-in max-w-3xl mx-auto">
            <Button variant="ghost" size="sm" onClick={handleQuestionnaireBack} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div data-ev-id="ev_0340cbc799" className="text-center mb-10">
              <h1 data-ev-id="ev_3af6ee806f" className="text-3xl font-bold text-foreground mb-3">What type of website are you building?</h1>
              <p data-ev-id="ev_31718252a1" className="text-lg text-muted-foreground">This helps us recommend the best templates and features</p>
            </div>

            <div data-ev-id="ev_820897f211" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {websiteTypes.map((type) =>
            <Card
              key={type.id}
              hover
              padding="md"
              className={`cursor-pointer text-center transition-all ${
              questionnaire.websiteType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''}`
              }
              onClick={() => setQuestionnaire({ ...questionnaire, websiteType: type.id })}>

                  <CardContent>
                    <div data-ev-id="ev_ca0d9c2808" className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                questionnaire.websiteType === type.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`
                }>
                      <type.icon className="w-6 h-6" />
                    </div>
                    <h3 data-ev-id="ev_a004a83a40" className="font-medium text-foreground text-sm">{type.label}</h3>
                  </CardContent>
                </Card>
            )}
            </div>

            <div data-ev-id="ev_9d030d42ec" className="flex justify-end">
              <Button onClick={handleQuestionnaireNext} disabled={!canProceed()}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        }

        {/* Step: Website Goal */}
        {step === 'website-goal' &&
        <div data-ev-id="ev_158641d96b" className="animate-fade-in max-w-3xl mx-auto">
            <Button variant="ghost" size="sm" onClick={handleQuestionnaireBack} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div data-ev-id="ev_1eef4e91bd" className="text-center mb-10">
              <h1 data-ev-id="ev_ae06179df4" className="text-3xl font-bold text-foreground mb-3">What's the main goal of your website?</h1>
              <p data-ev-id="ev_e8c25e1901" className="text-lg text-muted-foreground">We'll optimize your site for this purpose</p>
            </div>

            <div data-ev-id="ev_cafce24fa8" className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {websiteGoals.map((goal) =>
            <Card
              key={goal.id}
              hover
              padding="md"
              className={`cursor-pointer transition-all ${
              questionnaire.websiteGoal === goal.id ? 'ring-2 ring-primary bg-primary/5' : ''}`
              }
              onClick={() => setQuestionnaire({ ...questionnaire, websiteGoal: goal.id })}>

                  <CardContent className="flex items-start gap-3">
                    <div data-ev-id="ev_61185c1507" className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                questionnaire.websiteGoal === goal.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`
                }>
                      <goal.icon className="w-5 h-5" />
                    </div>
                    <div data-ev-id="ev_d02fe373a5">
                      <h3 data-ev-id="ev_11f63de4d7" className="font-medium text-foreground">{goal.label}</h3>
                      <p data-ev-id="ev_5dda66661e" className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </CardContent>
                </Card>
            )}
            </div>

            <div data-ev-id="ev_cbae05662e" className="flex justify-end">
              <Button onClick={handleQuestionnaireNext} disabled={!canProceed()}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        }

        {/* Step: Style Preference */}
        {step === 'style-preference' &&
        <div data-ev-id="ev_4d1364cd57" className="animate-fade-in max-w-3xl mx-auto">
            <Button variant="ghost" size="sm" onClick={handleQuestionnaireBack} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div data-ev-id="ev_28a99971d1" className="text-center mb-10">
              <h1 data-ev-id="ev_0f8f165712" className="text-3xl font-bold text-foreground mb-3">What style speaks to you?</h1>
              <p data-ev-id="ev_5f6ccfb345" className="text-lg text-muted-foreground">Choose a design direction that matches your brand</p>
            </div>

            <div data-ev-id="ev_c3f584070c" className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {stylePreferences.map((style) =>
            <Card
              key={style.id}
              hover
              padding="md"
              className={`cursor-pointer transition-all ${
              questionnaire.stylePreference === style.id ? 'ring-2 ring-primary bg-primary/5' : ''}`
              }
              onClick={() => setQuestionnaire({ ...questionnaire, stylePreference: style.id })}>

                  <CardContent>
                    <div data-ev-id="ev_900c13ec22" className="flex gap-1 mb-3">
                      {style.colors.map((color, i) =>
                  <div data-ev-id="ev_25fe997154"
                  key={i}
                  className="w-8 h-8 rounded-lg first:rounded-l-xl last:rounded-r-xl"
                  style={{ backgroundColor: color }} />

                  )}
                    </div>
                    <h3 data-ev-id="ev_eb1965aacf" className="font-medium text-foreground">{style.label}</h3>
                    <p data-ev-id="ev_8a60a7f5c1" className="text-sm text-muted-foreground">{style.description}</p>
                  </CardContent>
                </Card>
            )}
            </div>

            <div data-ev-id="ev_eeaa0ed5a8" className="flex justify-end">
              <Button onClick={handleQuestionnaireNext} disabled={!canProceed()}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        }

        {/* Step: Website Name */}
        {step === 'website-name' &&
        <div data-ev-id="ev_1a3a17ea14" className="animate-fade-in max-w-xl mx-auto">
            <Button variant="ghost" size="sm" onClick={handleQuestionnaireBack} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div data-ev-id="ev_0684700267" className="text-center mb-10">
              <h1 data-ev-id="ev_277560df4a" className="text-3xl font-bold text-foreground mb-3">What should we call your website?</h1>
              <p data-ev-id="ev_0b9ed9c927" className="text-lg text-muted-foreground">You can always change this later</p>
            </div>

            <div data-ev-id="ev_207885b241" className="mb-10">
              <Input
              placeholder="e.g., My Portfolio, Acme Inc, The Coffee Shop"
              value={questionnaire.websiteName}
              onChange={(e) => setQuestionnaire({ ...questionnaire, websiteName: e.target.value })}
              className="text-lg h-14 text-center" />

            </div>

            <div data-ev-id="ev_6f4b48cd43" className="flex justify-end">
              <Button onClick={handleComplete} disabled={!canProceed()} size="lg">
                Create My Website
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        }

        {/* Step: Complete */}
        {step === 'complete' &&
        <div data-ev-id="ev_edf4fbb787" className="animate-fade-in text-center max-w-xl mx-auto py-12">
            <div data-ev-id="ev_851b9c6d45" className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 data-ev-id="ev_9055546e1d" className="text-3xl font-bold text-foreground mb-3">You're all set!</h1>
            <p data-ev-id="ev_8e312b1b1a" className="text-lg text-muted-foreground mb-8">
              We've prepared a custom template based on your preferences. Ready to start building?
            </p>
            <Button size="lg" onClick={handleComplete}>
              Open Editor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        }
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={!!authModal}
        mode={authModal || 'signup'}
        onClose={() => setAuthModal(null)}
        onSwitchMode={(mode) => setAuthModal(mode)} />

    </div>);

}