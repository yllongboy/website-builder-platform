import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Crown, Eye, X } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { mockTemplates } from '@/data/mockData';
import type { Template, TemplateCategory } from '@/types';

const categories: {id: TemplateCategory;label: string;}[] = [
{ id: 'all', label: 'All Templates' },
{ id: 'business', label: 'Business' },
{ id: 'portfolio', label: 'Portfolio' },
{ id: 'ecommerce', label: 'E-commerce' },
{ id: 'blog', label: 'Blog' },
{ id: 'landing', label: 'Landing Page' },
{ id: 'saas', label: 'SaaS' },
{ id: 'agency', label: 'Agency' }];


export default function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isLoading] = useState(false);

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    navigate(`/editor/new?template=${template.id}`);
  };

  return (
    <AppLayout>
      <div data-ev-id="ev_9311c4a79d" className="max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div data-ev-id="ev_a10a444f01" className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div data-ev-id="ev_f084a841d8">
            <h1 data-ev-id="ev_6d08028a58" className="text-3xl font-bold text-foreground">Templates</h1>
            <p data-ev-id="ev_a7b1df228e" className="text-foreground-secondary mt-1">
              Choose from {mockTemplates.length} professionally designed templates
            </p>
          </div>
          <div data-ev-id="ev_ab69a5143e" className="flex items-center gap-3">
            <div data-ev-id="ev_0b48e51f43" className="w-full lg:w-80">
              <Input
                isSearch
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </div>
        </div>

        {/* Categories */}
        <div data-ev-id="ev_f83e319cb1" className="flex flex-wrap gap-2">
          {categories.map((category) =>
          <button data-ev-id="ev_29d03d5bc0"
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === category.id ?
          'bg-primary text-primary-foreground' :
          'bg-muted text-foreground-secondary hover:bg-surface-active hover:text-foreground'}
              `
          }>

              {category.label}
            </button>
          )}
        </div>

        {/* Templates Grid */}
        {isLoading ?
        <div data-ev-id="ev_37ed30d2b1" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) =>
          <SkeletonCard key={i} />
          )}
          </div> :
        filteredTemplates.length === 0 ?
        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="No templates found"
          description="Try adjusting your search or filter to find what you're looking for."
          action={{
            label: 'Clear Filters',
            onClick: () => {
              setSearchQuery('');
              setActiveCategory('all');
            }
          }} /> :


        <div data-ev-id="ev_eeb4359651" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) =>
          <Card key={template.id} hover padding="none" className="group overflow-hidden">
                <div data-ev-id="ev_1105f25be3" className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <img data-ev-id="ev_69012758ae"
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  
                  {/* Premium Badge */}
                  {template.isPremium &&
              <div data-ev-id="ev_f4ae5f7c13" className="absolute top-3 left-3">
                      <Badge variant="warning" className="bg-amber-500 text-white border-0">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
              }

                  {/* Hover Overlay */}
                  <div data-ev-id="ev_f47e5e1a72" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <Button onClick={() => setPreviewTemplate(template)} variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button onClick={() => handleUseTemplate(template)} size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div data-ev-id="ev_6ac5b43c23" className="flex items-start justify-between gap-2">
                    <div data-ev-id="ev_22861c96a9">
                      <h3 data-ev-id="ev_d072b8efad" className="font-semibold text-foreground">{template.name}</h3>
                      <p data-ev-id="ev_8ad8cf32a2" className="text-sm text-muted-foreground mt-0.5">{template.description}</p>
                    </div>
                  </div>
                  <div data-ev-id="ev_5c8b752d88" className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary" size="sm" className="capitalize">
                      {template.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
          )}
          </div>
        }

        {/* Template Preview Modal */}
        <Modal
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          size="full"
          title={previewTemplate?.name}
          description={previewTemplate?.description}>

          <div data-ev-id="ev_022c560271" className="flex flex-col gap-4">
            <div data-ev-id="ev_60ffb91307" className="aspect-video bg-muted rounded-xl overflow-hidden">
              <img data-ev-id="ev_2c8b7b5958"
              src={previewTemplate?.thumbnail}
              alt={previewTemplate?.name}
              className="w-full h-full object-cover" />

            </div>
            <div data-ev-id="ev_eb29eb7077" className="flex items-center justify-between">
              <div data-ev-id="ev_0f0126d67a" className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {previewTemplate?.category}
                </Badge>
                {previewTemplate?.isPremium &&
                <Badge variant="warning" className="bg-amber-500 text-white border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                }
              </div>
              <div data-ev-id="ev_252da6a2c7" className="flex gap-3">
                <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                  Cancel
                </Button>
                <Button onClick={() => previewTemplate && handleUseTemplate(previewTemplate)}>
                  Use This Template
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>);

}