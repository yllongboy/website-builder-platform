import { useState } from 'react';
import {
  Search,
  Book,
  MessageCircle,
  Video,
  FileText,
  ChevronRight,
  ExternalLink,
  Mail,
  Twitter,
  HelpCircle,
  Zap,
  Layout,
  Globe,
  CreditCard } from
'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickLinks = [
  { icon: Zap, title: 'Getting Started', description: 'Learn the basics of SiteForge' },
  { icon: Layout, title: 'Using the Editor', description: 'Master the drag-and-drop editor' },
  { icon: Globe, title: 'Publishing', description: 'How to publish your website' },
  { icon: CreditCard, title: 'Billing & Plans', description: 'Manage your subscription' }];


  const articles = [
  { title: 'How to create your first website', category: 'Getting Started', views: 1234 },
  { title: 'Adding custom domains', category: 'Publishing', views: 892 },
  { title: 'Using the template marketplace', category: 'Templates', views: 756 },
  { title: 'Optimizing for SEO', category: 'Advanced', views: 543 },
  { title: 'Understanding analytics', category: 'Analytics', views: 432 }];


  return (
    <AppLayout>
      <div data-ev-id="ev_c1fccfe380" className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">
        {/* Header */}
        <div data-ev-id="ev_6ef746ddb2" className="text-center">
          <h1 data-ev-id="ev_a5796f560f" className="text-3xl font-bold text-foreground mb-2">How can we help?</h1>
          <p data-ev-id="ev_0cdeb9faa5" className="text-foreground-secondary mb-6">Search our knowledge base or browse popular topics</p>
          <div data-ev-id="ev_0f81f0e6a8" className="max-w-xl mx-auto">
            <Input
              isSearch
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 text-base" />

          </div>
        </div>

        {/* Quick Links */}
        <div data-ev-id="ev_e9a1103419" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) =>
          <Card key={i} hover padding="md" className="group cursor-pointer">
              <CardContent className="flex flex-col items-center text-center gap-3">
                <div data-ev-id="ev_0c4b25d411" className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-6 h-6 text-primary" />
                </div>
                <div data-ev-id="ev_48ddd82247">
                  <h3 data-ev-id="ev_e6d117ba4a" className="font-semibold text-foreground">{link.title}</h3>
                  <p data-ev-id="ev_28b01ebf60" className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Resources */}
        <div data-ev-id="ev_527c58f30e" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
          { icon: Book, title: 'Documentation', description: 'Detailed guides and API docs', color: 'text-blue-500 bg-blue-500/10' },
          { icon: Video, title: 'Video Tutorials', description: 'Step-by-step video guides', color: 'text-purple-500 bg-purple-500/10' },
          { icon: MessageCircle, title: 'Community', description: 'Join our Discord server', color: 'text-green-500 bg-green-500/10' }].
          map((resource, i) =>
          <Card key={i} hover padding="md" className="group cursor-pointer">
              <CardContent className="flex items-start gap-4">
                <div data-ev-id="ev_a21418e0fd" className={`p-3 rounded-xl ${resource.color}`}>
                  <resource.icon className="w-5 h-5" />
                </div>
                <div data-ev-id="ev_a96ef3a306" className="flex-1">
                  <h3 data-ev-id="ev_ebf9942dc6" className="font-semibold text-foreground">{resource.title}</h3>
                  <p data-ev-id="ev_35104826b6" className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Popular Articles */}
        <Card variant="bordered" padding="lg">
          <div data-ev-id="ev_752d27cfa6" className="flex items-center justify-between mb-6">
            <div data-ev-id="ev_75f5f75a1e" className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <h2 data-ev-id="ev_86bf4c4210" className="text-lg font-semibold text-foreground">Popular Articles</h2>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>
          <div data-ev-id="ev_0341ef89be" className="flex flex-col divide-y divide-border">
            {articles.map((article, i) =>
            <a data-ev-id="ev_8d069808a1"
            key={i}
            href="#"
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">

                <div data-ev-id="ev_f45c7bb508" className="flex items-center gap-3">
                  <div data-ev-id="ev_4c56511ff4" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div data-ev-id="ev_f27d140341">
                    <p data-ev-id="ev_e8ead4a41a" className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </p>
                    <p data-ev-id="ev_0735107932" className="text-sm text-muted-foreground">{article.category}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>
        </Card>

        {/* Contact Support */}
        <Card variant="elevated" padding="lg" className="relative overflow-hidden">
          <div data-ev-id="ev_dc0cf3a570" className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="relative">
            <div data-ev-id="ev_7d52ae72ee" className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div data-ev-id="ev_0b1b5c8e38">
                <h2 data-ev-id="ev_46a750a20e" className="text-xl font-bold text-foreground mb-2">Still need help?</h2>
                <p data-ev-id="ev_6520fc67b7" className="text-muted-foreground">
                  Our support team is here to help you 24/7. Reach out via email or social media.
                </p>
              </div>
              <div data-ev-id="ev_b7a9542005" className="flex gap-3">
                <Button variant="outline" leftIcon={<Mail className="w-4 h-4" />}>
                  Email Support
                </Button>
                <Button leftIcon={<Twitter className="w-4 h-4" />}>
                  @SiteForge
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>);

}