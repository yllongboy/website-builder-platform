import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles,
  ArrowRight,
  Check,
  Play,
  Star,
  Zap,
  Shield,
  Globe,
  Palette,
  MousePointer,
  Layers,
  Crown,
  ChevronRight,
  Menu,
  X } from
'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { mockTemplates, mockPlans } from '@/data/mockData';
import { AuthModal } from '@/components/AuthModal';

export default function Landing() {
  const navigate = useNavigate();
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
  {
    icon: MousePointer,
    title: 'Drag & Drop Editor',
    description: 'Build pages visually with our intuitive drag-and-drop interface. No coding required.'
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    description: '50+ professionally designed templates for every industry and use case.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with global CDN. Your sites load in milliseconds.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Free SSL certificates and 99.9% uptime guarantee included.'
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description: 'Connect your own domain or use our free subdomain.'
  },
  {
    icon: Layers,
    title: 'SEO Optimized',
    description: 'Built-in SEO tools to help your site rank higher in search results.'
  }];


  const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder, TechStart',
    avatar: 'SC',
    content: 'SiteForge helped us launch our startup website in just 2 hours. The templates are stunning and the editor is incredibly intuitive.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Freelance Designer',
    avatar: 'MJ',
    content: "I've tried many website builders, but SiteForge is by far the best. It gives me the creative freedom I need without the complexity.",
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Small Business Owner',
    avatar: 'ER',
    content: 'As someone with zero technical skills, I was able to create a professional website for my bakery. My customers love it!',
    rating: 5
  }];


  const stats = [
  { value: '50K+', label: 'Websites Created' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '4.9/5', label: 'User Rating' }];


  return (
    <div data-ev-id="ev_f05f91e046" className="min-h-screen bg-background">
      {/* Navigation */}
      <nav data-ev-id="ev_6398800b5c" className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div data-ev-id="ev_bbaab4f890" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_de11e922ce" className="flex items-center justify-between h-16">
            <div data-ev-id="ev_6700974c68" className="flex items-center gap-2">
              <div data-ev-id="ev_588073fe81" className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span data-ev-id="ev_b3d59bb1c0" className="font-bold text-xl text-foreground">SiteForge</span>
            </div>

            {/* Desktop Nav */}
            <div data-ev-id="ev_cce654ec6f" className="hidden md:flex items-center gap-8">
              <a data-ev-id="ev_5ba03b1f78" href="#features" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Features</a>
              <a data-ev-id="ev_a1d908c230" href="#templates" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Templates</a>
              <a data-ev-id="ev_47c7ce814a" href="#pricing" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Pricing</a>
              <a data-ev-id="ev_bb2cc179fe" href="#testimonials" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">Testimonials</a>
            </div>

            <div data-ev-id="ev_c6da9fbef9" className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={() => setAuthModal('login')}>
                Log In
              </Button>
              <Button onClick={() => setAuthModal('signup')}>
                Get Started Free
              </Button>
            </div>

            {/* Mobile menu button */}
            <button data-ev-id="ev_38db4988a4"
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_e31054c799" className="md:hidden bg-background border-b border-border animate-slide-down">
            <div data-ev-id="ev_81700e9f29" className="px-4 py-4 flex flex-col gap-4">
              <a data-ev-id="ev_55a18d03c0" href="#features" className="text-foreground-secondary hover:text-foreground">Features</a>
              <a data-ev-id="ev_92faeb52eb" href="#templates" className="text-foreground-secondary hover:text-foreground">Templates</a>
              <a data-ev-id="ev_1eb0ad8aed" href="#pricing" className="text-foreground-secondary hover:text-foreground">Pricing</a>
              <a data-ev-id="ev_1f5a5629c6" href="#testimonials" className="text-foreground-secondary hover:text-foreground">Testimonials</a>
              <div data-ev-id="ev_2807ef06e7" className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setAuthModal('login')}>Log In</Button>
                <Button onClick={() => setAuthModal('signup')}>Get Started Free</Button>
              </div>
            </div>
          </div>
        }
      </nav>

      {/* Hero Section */}
      <section data-ev-id="ev_5e673cb34b" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div data-ev-id="ev_3e0fb86e74" className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-3xl opacity-50" />
        
        <div data-ev-id="ev_c2685c6b2c" className="max-w-7xl mx-auto relative">
          <div data-ev-id="ev_b99ab2f01a" className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" size="md" className="mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Now with AI-powered design suggestions
            </Badge>
            
            <h1 data-ev-id="ev_e37c643824" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up" style={{ textWrap: 'balance' }}>
              Build stunning websites{' '}
              <span data-ev-id="ev_15a2a89cea" className="gradient-text">without code</span>
            </h1>
            
            <p data-ev-id="ev_3dcfdf99b7" className="text-xl text-foreground-secondary mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms', textWrap: 'pretty' }}>
              Create professional, responsive websites in minutes with our intuitive drag-and-drop builder. No coding skills required.
            </p>

            <div data-ev-id="ev_e619448a72" className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button size="lg" onClick={() => navigate('/get-started')} className="shadow-glow text-base px-8">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <p data-ev-id="ev_9e81b59c50" className="text-sm text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
              No credit card required • Free forever plan available
            </p>
          </div>

          {/* Hero Image */}
          <div data-ev-id="ev_42895d41a4" className="mt-16 relative animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div data-ev-id="ev_76b6532a49" className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div data-ev-id="ev_3205547f35" className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div data-ev-id="ev_0852d6109e" className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
                <div data-ev-id="ev_dfdf531df4" className="flex gap-1.5">
                  <div data-ev-id="ev_d4ce1854b0" className="w-3 h-3 rounded-full bg-red-400" />
                  <div data-ev-id="ev_4794fb8d82" className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div data-ev-id="ev_a3f8f21b86" className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div data-ev-id="ev_4d8c62e66a" className="flex-1 flex justify-center">
                  <div data-ev-id="ev_830ea7affd" className="px-4 py-1 bg-background rounded-lg text-xs text-muted-foreground">
                    siteforge.io/editor
                  </div>
                </div>
              </div>
              <div data-ev-id="ev_726a6177c7" className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
                <div data-ev-id="ev_08c51f7af5" className="text-center">
                  <div data-ev-id="ev_b238488bf2" className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <p data-ev-id="ev_5290aacc59" className="text-muted-foreground">Interactive editor preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section data-ev-id="ev_9b9c46a94b" className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-muted/30">
        <div data-ev-id="ev_91f78055b9" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_0b9f83c3d5" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) =>
            <div data-ev-id="ev_cdca7fa979" key={i} className="text-center">
                <div data-ev-id="ev_79ac5ad89e" className="text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div data-ev-id="ev_94bb8ecc6e" className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section data-ev-id="ev_bece02f829" id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_99a7a05c69" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_19bea53156" className="text-center mb-16">
            <Badge variant="primary" size="md" className="mb-4">Features</Badge>
            <h2 data-ev-id="ev_65cd29395e" className="text-4xl font-bold text-foreground mb-4">Everything you need to succeed</h2>
            <p data-ev-id="ev_242cdf5d85" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make building websites a breeze
            </p>
          </div>

          <div data-ev-id="ev_155c28e3ad" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) =>
            <Card key={i} hover padding="lg" className="group">
                <CardContent>
                  <div data-ev-id="ev_c0a0e6b90f" className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 data-ev-id="ev_af9307057c" className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p data-ev-id="ev_db1156113b" className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section data-ev-id="ev_db7a9c1000" id="templates" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div data-ev-id="ev_dbe1ad6607" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_8c394d6d5f" className="text-center mb-16">
            <Badge variant="primary" size="md" className="mb-4">Templates</Badge>
            <h2 data-ev-id="ev_626d7534ec" className="text-4xl font-bold text-foreground mb-4">Start with a stunning template</h2>
            <p data-ev-id="ev_ed1b9fb15f" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from 50+ professionally designed templates
            </p>
          </div>

          <div data-ev-id="ev_b4b8cc1c8d" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTemplates.slice(0, 4).map((template) =>
            <Card key={template.id} hover padding="none" className="group overflow-hidden">
                <div data-ev-id="ev_03a4c6c225" className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <img data-ev-id="ev_b105f33a57"
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  {template.isPremium &&
                <div data-ev-id="ev_9993e0d2c5" className="absolute top-3 left-3">
                      <Badge variant="warning" className="bg-amber-500 text-white border-0">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                }
                  <div data-ev-id="ev_ecc300771a" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" onClick={() => navigate('/get-started')}>Use Template</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 data-ev-id="ev_75ac74cb69" className="font-semibold text-foreground">{template.name}</h3>
                  <p data-ev-id="ev_feb59d1d5f" className="text-sm text-muted-foreground capitalize">{template.category}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div data-ev-id="ev_28a78d971a" className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => navigate('/get-started')}>
              Browse All Templates
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section data-ev-id="ev_9792f3d98e" id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_a299041150" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_cd9688d134" className="text-center mb-16">
            <Badge variant="primary" size="md" className="mb-4">Testimonials</Badge>
            <h2 data-ev-id="ev_6267318196" className="text-4xl font-bold text-foreground mb-4">Loved by creators worldwide</h2>
            <p data-ev-id="ev_19600f9aa1" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about SiteForge
            </p>
          </div>

          <div data-ev-id="ev_f416974e45" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) =>
            <Card key={i} variant="elevated" padding="lg">
                <CardContent>
                  <div data-ev-id="ev_2b6dab39b8" className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) =>
                  <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  )}
                  </div>
                  <p data-ev-id="ev_80b36c4ac2" className="text-foreground mb-6">"{testimonial.content}"</p>
                  <div data-ev-id="ev_3f2efd73c3" className="flex items-center gap-3">
                    <div data-ev-id="ev_dfc86aaa80" className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-medium text-sm">
                      {testimonial.avatar}
                    </div>
                    <div data-ev-id="ev_10da1b90e3">
                      <p data-ev-id="ev_677859181c" className="font-medium text-foreground">{testimonial.name}</p>
                      <p data-ev-id="ev_9f7012aaef" className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section data-ev-id="ev_64bd355440" id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div data-ev-id="ev_c3be52ff71" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_3948df85fb" className="text-center mb-16">
            <Badge variant="primary" size="md" className="mb-4">Pricing</Badge>
            <h2 data-ev-id="ev_6f36e63e81" className="text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
            <p data-ev-id="ev_ead4685ced" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </div>

          <div data-ev-id="ev_62e85a9dda" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mockPlans.map((plan) =>
            <Card
              key={plan.id}
              variant={plan.isPopular ? 'elevated' : 'bordered'}
              padding="lg"
              className={`relative ${plan.isPopular ? 'ring-2 ring-primary scale-105' : ''}`}>

                {plan.isPopular &&
              <div data-ev-id="ev_355c87a39f" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" className="gradient-primary text-white border-0 shadow-glow">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
              }
                <CardContent>
                  <h3 data-ev-id="ev_b23797cd82" className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div data-ev-id="ev_054da37273" className="flex items-baseline gap-1 mb-6">
                    <span data-ev-id="ev_bd627a1802" className="text-4xl font-bold text-foreground">
                      ${plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && <span data-ev-id="ev_29b535be51" className="text-muted-foreground">/month</span>}
                  </div>
                  <ul data-ev-id="ev_d23be08184" className="flex flex-col gap-3 mb-8">
                    {plan.features.map((feature, i) =>
                  <li data-ev-id="ev_9310aac3e6" key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span data-ev-id="ev_d528b11df3" className="text-foreground-secondary">{feature}</span>
                      </li>
                  )}
                  </ul>
                  <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => navigate('/get-started')}>

                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_88e903f5fc" className="py-24 px-4 sm:px-6 lg:px-8">
        <div data-ev-id="ev_251211a190" className="max-w-4xl mx-auto">
          <div data-ev-id="ev_f3eb76e29b" className="relative rounded-3xl overflow-hidden">
            <div data-ev-id="ev_aa90e040e0" className="absolute inset-0 gradient-primary" />
            <div data-ev-id="ev_da30d8d422" className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div data-ev-id="ev_4d9501280d" className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
              <h2 data-ev-id="ev_172b1a890d" className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to build your dream website?
              </h2>
              <p data-ev-id="ev_4b7b8a2c6d" className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                Join 50,000+ creators who trust SiteForge for their online presence.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/get-started')}>

                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_9c1f17b8af" className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div data-ev-id="ev_a89976c89b" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_90126729f9" className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div data-ev-id="ev_17c942635e" className="flex items-center gap-2">
              <div data-ev-id="ev_38c179c746" className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span data-ev-id="ev_27790e1e27" className="font-bold text-lg text-foreground">SiteForge</span>
            </div>
            <div data-ev-id="ev_1273739a72" className="flex items-center gap-8 text-sm text-muted-foreground">
              <a data-ev-id="ev_506e7248be" href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a data-ev-id="ev_68a16e97b0" href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a data-ev-id="ev_70b35469cb" href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p data-ev-id="ev_ca9a45c95d" className="text-sm text-muted-foreground">
              © 2024 SiteForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={!!authModal}
        mode={authModal || 'login'}
        onClose={() => setAuthModal(null)}
        onSwitchMode={(mode) => setAuthModal(mode)} />

    </div>);

}