import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent, BadgeComponent, CardComponent, CardContentComponent } from '@platform/ui';
import { LucideAngularModule, Sparkles, ArrowRight, Play, Crown, MousePointer, Palette, Zap, Shield, Globe, Layers, Check, Star, Menu, X } from 'lucide-angular';

@Component({
  selector: 'wb-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardContentComponent,
    LucideAngularModule
  ],
  template: `
    <div data-ev-id="ev_f05f91e046" class="min-h-screen bg-background">
      <!-- Navigation -->
      <nav data-ev-id="ev_6398800b5c" class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div data-ev-id="ev_bbaab4f890" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_de11e922ce" class="flex items-center justify-between h-16">
            <div data-ev-id="ev_6700974c68" class="flex items-center gap-2">
              <div data-ev-id="ev_588073fe81" class="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <lucide-icon name="sparkles" class="w-5 h-5 text-white"></lucide-icon>
              </div>
              <span data-ev-id="ev_b3d59bb1c0" class="font-bold text-xl text-foreground">SiteForge</span>
            </div>

            <!-- Desktop Nav -->
            <div data-ev-id="ev_cce654ec6f" class="hidden md:flex items-center gap-8">
              <a data-ev-id="ev_5ba03b1f78" href="#features" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Features</a>
              <a data-ev-id="ev_a1d908c230" href="#templates" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Templates</a>
              <a data-ev-id="ev_47c7ce814a" href="#pricing" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Pricing</a>
              <a data-ev-id="ev_bb2cc179fe" href="#testimonials" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Testimonials</a>
            </div>

            <div data-ev-id="ev_c6da9fbef9" class="hidden md:flex items-center gap-3">
              <button ui-button variant="ghost" routerLink="/login">Log In</button>
              <button ui-button routerLink="/register">Get Started Free</button>
            </div>

            <!-- Mobile menu button -->
            <button data-ev-id="ev_38db4988a4"
              class="md:hidden p-2 rounded-lg hover:bg-muted"
              (click)="mobileMenuOpen = !mobileMenuOpen">
              <lucide-icon [name]="mobileMenuOpen ? 'x' : 'menu'" class="w-5 h-5"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div *ngIf="mobileMenuOpen" data-ev-id="ev_e31054c799" class="md:hidden bg-background border-b border-border animate-slide-down">
          <div data-ev-id="ev_81700e9f29" class="px-4 py-4 flex flex-col gap-4">
            <a data-ev-id="ev_55a18d03c0" href="#features" class="text-foreground-secondary hover:text-foreground">Features</a>
            <a data-ev-id="ev_92faeb52eb" href="#templates" class="text-foreground-secondary hover:text-foreground">Templates</a>
            <a data-ev-id="ev_1eb0ad8aed" href="#pricing" class="text-foreground-secondary hover:text-foreground">Pricing</a>
            <a data-ev-id="ev_1f5a5629c6" href="#testimonials" class="text-foreground-secondary hover:text-foreground">Testimonials</a>
            <div data-ev-id="ev_2807ef06e7" class="flex flex-col gap-2 pt-4 border-t border-border">
              <button ui-button variant="outline" routerLink="/login">Log In</button>
              <button ui-button routerLink="/register">Get Started Free</button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section data-ev-id="ev_5e673cb34b" class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <!-- Background decoration -->
        <div data-ev-id="ev_3e0fb86e74" class="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-3xl opacity-50"></div>
        
        <div data-ev-id="ev_c2685c6b2c" class="max-w-7xl mx-auto relative">
          <div data-ev-id="ev_b99ab2f01a" class="text-center max-w-4xl mx-auto">
            <ui-badge variant="primary" class="mb-6 animate-fade-in">
              <lucide-icon name="sparkles" class="w-3.5 h-3.5 mr-1"></lucide-icon>
              Now with AI-powered design suggestions
            </ui-badge>
            
            <h1 data-ev-id="ev_e37c643824" class="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up" style="text-wrap: balance">
              Build stunning websites <span data-ev-id="ev_15a2a89cea" class="gradient-text">without code</span>
            </h1>
            
            <p data-ev-id="ev_3dcfdf99b7" class="text-xl text-foreground-secondary mb-10 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 100ms; text-wrap: pretty">
              Create professional, responsive websites in minutes with our intuitive drag-and-drop builder. No coding skills required.
            </p>

            <div data-ev-id="ev_e619448a72" class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 200ms">
              <button ui-button size="lg" routerLink="/register" class="shadow-glow text-base px-8">
                Start Building Free
                <lucide-icon name="arrow-right" class="w-5 h-5 ml-2"></lucide-icon>
              </button>
              <button ui-button size="lg" variant="outline" class="text-base px-8">
                <lucide-icon name="play" class="w-5 h-5 mr-2"></lucide-icon>
                Watch Demo
              </button>
            </div>

            <p data-ev-id="ev_9e81b59c50" class="text-sm text-muted-foreground mt-6 animate-fade-in" style="animation-delay: 300ms">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>

      <!-- ── FEATURES ──────────────────────────────────────────────── -->
      <section id="features" class="scroll-mt-16 py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <ui-badge variant="outline" class="mb-4 inline-flex">
              <lucide-icon name="zap" class="w-3.5 h-3.5 mr-1.5"></lucide-icon>
              Everything you need
            </ui-badge>
            <h2 class="text-4xl sm:text-5xl font-bold text-foreground mb-4 mt-4" style="text-wrap: balance">
              Build faster. Launch smarter.
            </h2>
            <p class="text-lg text-foreground-secondary max-w-2xl mx-auto" style="text-wrap: pretty">
              SiteForge gives you every tool to create, customize, and publish stunning websites — all in one place.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
              <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <lucide-icon name="mouse-pointer" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-base font-semibold text-foreground mb-2">Drag-and-Drop Builder</h3>
              <p class="text-sm text-foreground-secondary leading-relaxed">Visually compose pages by dragging elements into place. No code required — just click, drag, and publish.</p>
            </div>
            <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
              <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <lucide-icon name="palette" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-base font-semibold text-foreground mb-2">Designer Templates</h3>
              <p class="text-sm text-foreground-secondary leading-relaxed">Start from a curated library of professionally crafted templates built for every industry and use case.</p>
            </div>
            <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
              <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <lucide-icon name="zap" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-base font-semibold text-foreground mb-2">Blazing-Fast Performance</h3>
              <p class="text-sm text-foreground-secondary leading-relaxed">Sites deploy to a global CDN, ensuring sub-second load times for visitors worldwide.</p>
            </div>
            <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
              <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <lucide-icon name="shield" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-base font-semibold text-foreground mb-2">Secure by Default</h3>
              <p class="text-sm text-foreground-secondary leading-relaxed">Free SSL, DDoS protection, and enterprise-grade security baked in. Your site and visitors are always protected.</p>
            </div>
            <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
              <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <lucide-icon name="globe" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-base font-semibold text-foreground mb-2">Custom Domains</h3>
              <p class="text-sm text-foreground-secondary leading-relaxed">Connect your own domain with one click, or publish instantly to a free yourname.siteforge.io subdomain.</p>
            </div>
            <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
              <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <lucide-icon name="layers" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <h3 class="text-base font-semibold text-foreground mb-2">Flexible Page Layouts</h3>
              <p class="text-sm text-foreground-secondary leading-relaxed">Build any layout imaginable — multi-page sites, landing pages, portfolios — all responsive by default.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── TEMPLATES ─────────────────────────────────────────────── -->
      <section id="templates" class="scroll-mt-16 py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <ui-badge variant="primary" class="mb-4 inline-flex">
              <lucide-icon name="palette" class="w-3.5 h-3.5 mr-1.5"></lucide-icon>
              Ready-made templates
            </ui-badge>
            <h2 class="text-4xl sm:text-5xl font-bold text-foreground mb-4 mt-4" style="text-wrap: balance">
              Start from a beautiful template
            </h2>
            <p class="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Choose from dozens of professionally designed templates — then customize every pixel to make it yours.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-glow transition-shadow cursor-pointer">
              <div class="h-44 gradient-primary relative overflow-hidden">
                <div class="absolute inset-0 p-4 flex flex-col justify-end">
                  <div class="h-2 w-2/3 bg-white/30 rounded-full mb-2"></div>
                  <div class="h-1.5 w-1/2 bg-white/20 rounded-full mb-3"></div>
                  <div class="flex gap-2"><div class="h-6 w-16 bg-white/25 rounded-full"></div><div class="h-6 w-12 bg-white/15 rounded-full"></div></div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="text-sm font-semibold text-foreground">Portfolio Pro</h3>
                  <ui-badge variant="outline">Free</ui-badge>
                </div>
                <p class="text-xs text-foreground-secondary">Showcase your work with style</p>
              </div>
            </div>
            <div class="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-glow transition-shadow cursor-pointer">
              <div class="h-44 bg-gradient-to-br from-violet-600 to-indigo-700 relative overflow-hidden">
                <div class="absolute inset-0 p-4 flex flex-col justify-end">
                  <div class="h-2 w-3/4 bg-white/30 rounded-full mb-2"></div>
                  <div class="h-1.5 w-1/2 bg-white/20 rounded-full mb-1.5"></div>
                  <div class="h-1.5 w-2/3 bg-white/15 rounded-full mb-3"></div>
                  <div class="h-6 w-20 bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="text-sm font-semibold text-foreground">Business Edge</h3>
                  <ui-badge variant="primary">Pro</ui-badge>
                </div>
                <p class="text-xs text-foreground-secondary">Professional landing pages that convert</p>
              </div>
            </div>
            <div class="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-glow transition-shadow cursor-pointer">
              <div class="h-44 bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden">
                <div class="absolute inset-0 p-4 flex flex-col justify-end gap-1.5">
                  <div class="h-1.5 w-full bg-white/20 rounded-full"></div>
                  <div class="h-1.5 w-5/6 bg-white/20 rounded-full"></div>
                  <div class="h-1.5 w-2/3 bg-white/15 rounded-full"></div>
                  <div class="h-1.5 w-3/4 bg-white/10 rounded-full"></div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="text-sm font-semibold text-foreground">Creator Blog</h3>
                  <ui-badge variant="outline">Free</ui-badge>
                </div>
                <p class="text-xs text-foreground-secondary">Share your thoughts with the world</p>
              </div>
            </div>
            <div class="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-glow transition-shadow cursor-pointer">
              <div class="h-44 bg-gradient-to-br from-orange-500 to-pink-600 relative overflow-hidden">
                <div class="absolute inset-0 p-4 flex flex-col justify-end">
                  <div class="grid grid-cols-2 gap-1.5 mb-2"><div class="h-10 bg-white/20 rounded-xl"></div><div class="h-10 bg-white/20 rounded-xl"></div></div>
                  <div class="h-7 w-full bg-white/25 rounded-full"></div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="text-sm font-semibold text-foreground">Storefront</h3>
                  <ui-badge variant="primary">Pro</ui-badge>
                </div>
                <p class="text-xs text-foreground-secondary">Sell products and grow your brand</p>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button ui-button variant="outline" size="lg">
              Browse all templates
              <lucide-icon name="arrow-right" class="w-4 h-4 ml-2"></lucide-icon>
            </button>
          </div>
        </div>
      </section>

      <!-- ── PRICING ───────────────────────────────────────────────── -->
      <section id="pricing" class="scroll-mt-16 py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <ui-badge variant="outline" class="mb-4 inline-flex">
              <lucide-icon name="sparkles" class="w-3.5 h-3.5 mr-1.5"></lucide-icon>
              Simple pricing
            </ui-badge>
            <h2 class="text-4xl sm:text-5xl font-bold text-foreground mb-4 mt-4" style="text-wrap: balance">
              Plans for every stage of growth
            </h2>
            <p class="text-lg text-foreground-secondary max-w-xl mx-auto">
              Start free, scale as you grow. No hidden fees. Cancel anytime.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <!-- Free -->
            <div class="p-8 rounded-2xl bg-card border border-border flex flex-col">
              <div class="mb-6">
                <h3 class="text-xl font-bold text-foreground mb-1">Free</h3>
                <p class="text-sm text-foreground-secondary mb-4">Perfect for getting started</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-foreground">$0</span>
                  <span class="text-sm text-foreground-secondary">/month</span>
                </div>
              </div>
              <ul class="space-y-3 flex-1 mb-8">
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>1 website</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>Free subdomain</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>Up to 10 pages</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>Free templates</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>SSL certificate</li>
              </ul>
              <button ui-button variant="outline" size="lg" routerLink="/register" class="w-full">Get started free</button>
            </div>
            <!-- Pro -->
            <div class="p-8 rounded-2xl gradient-primary flex flex-col relative shadow-glow">
              <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <ui-badge variant="secondary" class="inline-flex px-3">
                  <lucide-icon name="crown" class="w-3.5 h-3.5 mr-1.5"></lucide-icon>
                  Most Popular
                </ui-badge>
              </div>
              <div class="mb-6 mt-2">
                <h3 class="text-xl font-bold text-white mb-1">Pro</h3>
                <p class="text-sm text-white/70 mb-4">For creators and small businesses</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-white">$19</span>
                  <span class="text-sm text-white/70">/month</span>
                </div>
              </div>
              <ul class="space-y-3 flex-1 mb-8">
                <li class="flex items-center gap-2.5 text-sm text-white/90"><lucide-icon name="check" class="w-4 h-4 text-white flex-shrink-0"></lucide-icon>Unlimited websites</li>
                <li class="flex items-center gap-2.5 text-sm text-white/90"><lucide-icon name="check" class="w-4 h-4 text-white flex-shrink-0"></lucide-icon>Custom domain included</li>
                <li class="flex items-center gap-2.5 text-sm text-white/90"><lucide-icon name="check" class="w-4 h-4 text-white flex-shrink-0"></lucide-icon>Unlimited pages</li>
                <li class="flex items-center gap-2.5 text-sm text-white/90"><lucide-icon name="check" class="w-4 h-4 text-white flex-shrink-0"></lucide-icon>All premium templates</li>
                <li class="flex items-center gap-2.5 text-sm text-white/90"><lucide-icon name="check" class="w-4 h-4 text-white flex-shrink-0"></lucide-icon>AI design suggestions</li>
                <li class="flex items-center gap-2.5 text-sm text-white/90"><lucide-icon name="check" class="w-4 h-4 text-white flex-shrink-0"></lucide-icon>Priority support</li>
              </ul>
              <button ui-button size="lg" routerLink="/register" class="w-full !bg-white !text-primary hover:!bg-white/90 font-semibold">Start Pro trial</button>
            </div>
            <!-- Enterprise -->
            <div class="p-8 rounded-2xl bg-card border border-border flex flex-col">
              <div class="mb-6">
                <h3 class="text-xl font-bold text-foreground mb-1">Enterprise</h3>
                <p class="text-sm text-foreground-secondary mb-4">For teams and organizations</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-foreground">Custom</span>
                </div>
              </div>
              <ul class="space-y-3 flex-1 mb-8">
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>Everything in Pro</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>Team collaboration</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>White-label branding</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>SSO / SAML authentication</li>
                <li class="flex items-center gap-2.5 text-sm text-foreground-secondary"><lucide-icon name="check" class="w-4 h-4 text-primary flex-shrink-0"></lucide-icon>SLA &amp; dedicated support</li>
              </ul>
              <button ui-button variant="outline" size="lg" class="w-full">Contact sales</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ── TESTIMONIALS ──────────────────────────────────────────── -->
      <section id="testimonials" class="scroll-mt-16 py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <ui-badge variant="outline" class="mb-4 inline-flex">
              <lucide-icon name="star" class="w-3.5 h-3.5 mr-1.5"></lucide-icon>
              Loved by builders
            </ui-badge>
            <h2 class="text-4xl sm:text-5xl font-bold text-foreground mb-4 mt-4" style="text-wrap: balance">
              Trusted by thousands of creators
            </h2>
            <p class="text-lg text-foreground-secondary max-w-xl mx-auto">
              See why entrepreneurs, freelancers, and businesses choose SiteForge.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ui-card>
              <div class="flex gap-0.5 mb-4">
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
              </div>
              <blockquote class="text-sm text-foreground-secondary leading-relaxed mb-6">"I launched my freelance portfolio in under an hour. The drag-and-drop editor is incredibly intuitive — I didn't need a single tutorial."</blockquote>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">SM</div>
                <div><p class="text-sm font-semibold text-foreground">Sarah Mitchell</p><p class="text-xs text-muted-foreground">Freelance Designer</p></div>
              </div>
            </ui-card>
            <ui-card>
              <div class="flex gap-0.5 mb-4">
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
              </div>
              <blockquote class="text-sm text-foreground-secondary leading-relaxed mb-6">"We switched from a $300/month agency retainer to SiteForge Pro. Our site looks better, loads faster, and we update it ourselves without waiting weeks."</blockquote>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">JK</div>
                <div><p class="text-sm font-semibold text-foreground">James Kowalski</p><p class="text-xs text-muted-foreground">Owner, Kowalski Bakery</p></div>
              </div>
            </ui-card>
            <ui-card>
              <div class="flex gap-0.5 mb-4">
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
                <lucide-icon name="star" class="w-4 h-4 text-yellow-400" style="fill: currentColor; stroke: currentColor;"></lucide-icon>
              </div>
              <blockquote class="text-sm text-foreground-secondary leading-relaxed mb-6">"The template library is stunning. I had a fully branded product launch page live the same afternoon I discovered SiteForge. Genuinely impressive."</blockquote>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AP</div>
                <div><p class="text-sm font-semibold text-foreground">Aisha Patel</p><p class="text-xs text-muted-foreground">Founder, Bloom Wellness</p></div>
              </div>
            </ui-card>
          </div>
        </div>
      </section>

      <!-- ── FINAL CTA ─────────────────────────────────────────────── -->
      <section class="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div class="max-w-4xl mx-auto text-center relative">
          <div class="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
            <div class="w-[700px] h-[400px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-3xl opacity-60"></div>
          </div>
          <ui-badge variant="primary" class="mb-6 inline-flex">
            <lucide-icon name="sparkles" class="w-3.5 h-3.5 mr-1.5"></lucide-icon>
            Start building today
          </ui-badge>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 mt-4" style="text-wrap: balance">
            Your next website is<br>
            <span class="gradient-text">one click away</span>
          </h2>
          <p class="text-lg text-foreground-secondary mb-10 max-w-xl mx-auto" style="text-wrap: pretty">
            Join over 50,000 creators who have already built their dream websites with SiteForge. No credit card required.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button ui-button size="lg" routerLink="/register" class="shadow-glow text-base px-8">
              Create your free website
              <lucide-icon name="arrow-right" class="w-5 h-5 ml-2"></lucide-icon>
            </button>
            <button ui-button variant="ghost" size="lg" class="text-base px-8">View all features</button>
          </div>
          <p class="text-sm text-muted-foreground mt-6">Free forever &middot; No credit card needed &middot; Cancel anytime</p>
        </div>
      </section>

      <!-- ── FOOTER ────────────────────────────────────────────────── -->
      <footer class="bg-background border-t border-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div class="col-span-2">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                  <lucide-icon name="sparkles" class="w-5 h-5 text-white"></lucide-icon>
                </div>
                <span class="font-bold text-xl text-foreground">SiteForge</span>
              </div>
              <p class="text-sm text-foreground-secondary max-w-xs leading-relaxed">The simplest way to build and publish professional websites. No code. No complexity. Just results.</p>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-foreground mb-4">Product</h4>
              <ul class="space-y-3">
                <li><a href="#features" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#templates" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#pricing" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-foreground mb-4">Company</h4>
              <ul class="space-y-3">
                <li><a href="#" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-foreground mb-4">Support</h4>
              <ul class="space-y-3">
                <li><a href="#" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Documentation</a></li>
                <li><a routerLink="/help" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" class="text-sm text-foreground-secondary hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm text-muted-foreground">© 2026 SiteForge. All rights reserved.</p>
            <nav aria-label="Legal" class="flex items-center gap-6">
              <a href="#" class="text-sm text-muted-foreground hover:text-foreground-secondary transition-colors">Privacy Policy</a>
              <a href="#" class="text-sm text-muted-foreground hover:text-foreground-secondary transition-colors">Terms of Service</a>
              <a href="#" class="text-sm text-muted-foreground hover:text-foreground-secondary transition-colors">Cookie Policy</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  readonly Sparkles = Sparkles;
  readonly ArrowRight = ArrowRight;
  readonly Play = Play;
  readonly Menu = Menu;
  readonly X = X;
  readonly Crown = Crown;
  readonly MousePointer = MousePointer;
  readonly Palette = Palette;
  readonly Zap = Zap;
  readonly Shield = Shield;
  readonly Globe = Globe;
  readonly Layers = Layers;
  readonly Check = Check;
  readonly Star = Star;

  mobileMenuOpen = false;
}

