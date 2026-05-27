import { useNavigate } from 'react-router';
import {
  Plus,
  Globe,
  LayoutTemplate,
  CreditCard,
  ArrowRight,
  Clock,
  Sparkles,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockWebsites, mockTemplates } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';
  const recentWebsites = mockWebsites.slice(0, 3);
  const suggestedTemplates = mockTemplates.filter((t) => !t.isPremium).slice(0, 4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <AppLayout>
      <div data-ev-id="ev_5084535c65" className="max-w-7xl mx-auto flex flex-col gap-8 animate-fade-in">
        {/* Welcome Section */}
        <section data-ev-id="ev_6e02ef731e" className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div data-ev-id="ev_89704eed6a">
            <h1 data-ev-id="ev_6f3b0c0f1c" className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {firstName}! 👋
            </h1>
            <p data-ev-id="ev_037e9fe00f" className="text-foreground-secondary">
              Build beautiful websites without writing code.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate('/editor/new')}
            leftIcon={<Plus className="w-5 h-5" />}
            className="shadow-glow">

            Create New Website
          </Button>
        </section>

        {/* Stats Cards */}
        <section data-ev-id="ev_e8ff743016" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
          { label: 'Total Websites', value: '3', icon: Globe, change: '+1 this month', color: 'text-primary' },
          { label: 'Total Views', value: '2,451', icon: Eye, change: '+12% this week', color: 'text-success' },
          { label: 'Published', value: '2', icon: TrendingUp, change: '67% of total', color: 'text-accent' },
          { label: 'Plan', value: user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Free', icon: Sparkles, change: user?.plan === 'pro' ? 'Renews Jan 15' : 'Upgrade available', color: 'text-warning' }].
          map((stat, i) =>
          <Card key={i} variant="elevated" padding="md" hover>
              <CardContent className="flex items-start justify-between">
                <div data-ev-id="ev_2d76099221">
                  <p data-ev-id="ev_c8835348fb" className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p data-ev-id="ev_95f741dbba" className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p data-ev-id="ev_b5c3c2eee2" className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div data-ev-id="ev_70e2eaea83" className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Quick Access */}
        <section data-ev-id="ev_2478280abc">
          <h2 data-ev-id="ev_d86f256d92" className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
          <div data-ev-id="ev_bc5e8bcf42" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
            { label: 'Templates', description: 'Browse 50+ templates', icon: LayoutTemplate, path: '/templates', gradient: 'from-primary to-accent' },
            { label: 'My Websites', description: 'Manage your sites', icon: Globe, path: '/websites', gradient: 'from-accent to-pink-500' },
            { label: 'Billing', description: 'View your plan', icon: CreditCard, path: '/billing', gradient: 'from-amber-500 to-orange-500' }].
            map((item, i) =>
            <Card
              key={i}
              hover
              padding="none"
              className="group overflow-hidden"
              onClick={() => navigate(item.path)}>

                <div data-ev-id="ev_d54080dd6c" className={`h-2 bg-gradient-to-r ${item.gradient}`} />
                <CardContent className="p-5 flex items-center gap-4">
                  <div data-ev-id="ev_b4fd916c6a" className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div data-ev-id="ev_764823a5d1" className="flex-1">
                    <p data-ev-id="ev_fea3bc0276" className="font-semibold text-foreground">{item.label}</p>
                    <p data-ev-id="ev_c74415dfec" className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Recently Edited */}
        <section data-ev-id="ev_96b64c9172">
          <div data-ev-id="ev_8be4cce12c" className="flex items-center justify-between mb-4">
            <h2 data-ev-id="ev_68dac287d7" className="text-lg font-semibold text-foreground">Recently Edited</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/websites')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>
          <div data-ev-id="ev_969e64ac94" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentWebsites.map((website) =>
            <Card key={website.id} hover padding="none" className="group overflow-hidden">
                <div data-ev-id="ev_b9ba361ab9" className="relative aspect-video bg-muted overflow-hidden">
                  {website.thumbnail ?
                <img data-ev-id="ev_8d91cb7d43"
                src={website.thumbnail}
                alt={website.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> :


                <div data-ev-id="ev_5e68769792" className="w-full h-full flex items-center justify-center">
                      <Globe className="w-12 h-12 text-muted-foreground" />
                    </div>
                }
                  <div data-ev-id="ev_1481f8ecae" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div data-ev-id="ev_fdad6727c0" className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/editor/${website.id}`)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1">
                      Preview
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div data-ev-id="ev_859de32000" className="flex items-start justify-between gap-2">
                    <div data-ev-id="ev_06b10edc28">
                      <h3 data-ev-id="ev_e9d3564aa8" className="font-medium text-foreground">{website.name}</h3>
                      <p data-ev-id="ev_bfe0437a86" className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(website.updatedAt)}
                      </p>
                    </div>
                    <Badge
                    variant={website.status === 'published' ? 'success' : 'default'}
                    dot>

                      {website.status === 'published' ? 'Live' : 'Draft'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Suggested Templates */}
        <section data-ev-id="ev_41902d2b12">
          <div data-ev-id="ev_7526fb4a92" className="flex items-center justify-between mb-4">
            <div data-ev-id="ev_e9beee853f">
              <h2 data-ev-id="ev_cb87673a8d" className="text-lg font-semibold text-foreground">Suggested Templates</h2>
              <p data-ev-id="ev_ea8622951a" className="text-sm text-muted-foreground">Start with a professionally designed template</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/templates')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Browse All
            </Button>
          </div>
          <div data-ev-id="ev_2b7c96d678" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedTemplates.map((template) =>
            <Card key={template.id} hover padding="none" className="group overflow-hidden">
                <div data-ev-id="ev_a9900873aa" className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <img data-ev-id="ev_b79ca1e618"
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                  <div data-ev-id="ev_7f699f3668" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" onClick={() => navigate(`/editor/new?template=${template.id}`)}>
                      Use Template
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 data-ev-id="ev_b1f4be2688" className="font-medium text-foreground text-sm">{template.name}</h3>
                  <p data-ev-id="ev_93e0c8bfd6" className="text-xs text-muted-foreground capitalize">{template.category}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </AppLayout>);

}