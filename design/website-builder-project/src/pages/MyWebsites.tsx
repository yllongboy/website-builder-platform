import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Plus,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Globe,
  Edit,
  Eye,
  Trash2,
  Rocket,
  Copy,
  ExternalLink,
  Clock,
  Filter } from
'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import { Select } from '@/components/ui/Dropdown';
import { SkeletonCard, SkeletonList } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { mockWebsites } from '@/data/mockData';
import type { Website } from '@/types';

type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'name' | 'status';

export default function MyWebsites() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Website | null>(null);
  const [websites, setWebsites] = useState(mockWebsites);

  const filteredWebsites = websites.
  filter((website) => {
    const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || website.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).
  sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'recent':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = (website: Website) => {
    setWebsites((prev) => prev.filter((w) => w.id !== website.id));
    setDeleteModal(null);
  };

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const WebsiteActions = ({ website }: {website: Website;}) =>
  <Dropdown
    align="right"
    trigger={
    <button data-ev-id="ev_4a51e26f0d" className="p-2 rounded-lg hover:bg-muted transition-colors">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
    }>

      <DropdownItem icon={<Edit className="w-4 h-4" />} onClick={() => navigate(`/editor/${website.id}`)}>
        Edit
      </DropdownItem>
      <DropdownItem icon={<Eye className="w-4 h-4" />} onClick={() => navigate(`/preview/${website.id}`)}>
        Preview
      </DropdownItem>
      {website.status === 'draft' ?
    <DropdownItem icon={<Rocket className="w-4 h-4" />}>
          Publish
        </DropdownItem> :

    <DropdownItem icon={<ExternalLink className="w-4 h-4" />} onClick={() => website.url && window.open(website.url, '_blank')}>
          View Live
        </DropdownItem>
    }
      <DropdownItem icon={<Copy className="w-4 h-4" />}>
        Duplicate
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem icon={<Trash2 className="w-4 h-4" />} destructive onClick={() => setDeleteModal(website)}>
        Delete
      </DropdownItem>
    </Dropdown>;


  return (
    <AppLayout>
      <div data-ev-id="ev_4c25fbf916" className="max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in">
        {/* Header */}
        <div data-ev-id="ev_e1e928c064" className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div data-ev-id="ev_dc536711c8">
            <h1 data-ev-id="ev_08311ee56b" className="text-3xl font-bold text-foreground">My Websites</h1>
            <p data-ev-id="ev_bb4e612bb7" className="text-foreground-secondary mt-1">
              Manage and organize all your websites
            </p>
          </div>
          <Button
            onClick={() => navigate('/editor/new')}
            leftIcon={<Plus className="w-4 h-4" />}>

            Create Website
          </Button>
        </div>

        {/* Filters & Controls */}
        <div data-ev-id="ev_daaf61bf71" className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div data-ev-id="ev_f8e7eafe97" className="flex-1 max-w-md">
            <Input
              isSearch
              placeholder="Search websites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />

          </div>
          <div data-ev-id="ev_58f60092d6" className="flex items-center gap-3">
            <Select
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as typeof statusFilter)}
              options={[
              { value: 'all', label: 'All Status' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' }]
              }
              className="w-36" />

            <Select
              value={sortBy}
              onChange={(v) => setSortBy(v as SortOption)}
              options={[
              { value: 'recent', label: 'Recently Edited' },
              { value: 'name', label: 'Name' },
              { value: 'status', label: 'Status' }]
              }
              className="w-40" />

            <div data-ev-id="ev_63a305528b" className="flex items-center bg-muted rounded-lg p-1">
              <button data-ev-id="ev_d4c08b23a3"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-surface shadow-sm text-foreground' : 'text-muted-foreground'}`}>

                <Grid3X3 className="w-4 h-4" />
              </button>
              <button data-ev-id="ev_a5a9a709f7"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-surface shadow-sm text-foreground' : 'text-muted-foreground'}`}>

                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ?
        viewMode === 'grid' ?
        <div data-ev-id="ev_a58656ba9b" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) =>
          <SkeletonCard key={i} />
          )}
            </div> :

        <SkeletonList count={5} /> :

        filteredWebsites.length === 0 ?
        websites.length === 0 ?
        <EmptyState
          icon={<Globe className="w-8 h-8" />}
          title="No websites yet"
          description="Create your first website to get started. It only takes a few minutes!"
          action={{
            label: 'Create Website',
            onClick: () => navigate('/editor/new')
          }}
          secondaryAction={{
            label: 'Browse Templates',
            onClick: () => navigate('/templates')
          }} /> :


        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="No websites found"
          description="Try adjusting your search or filters."
          action={{
            label: 'Clear Filters',
            onClick: () => {
              setSearchQuery('');
              setStatusFilter('all');
            }
          }} /> :


        viewMode === 'grid' ?
        <div data-ev-id="ev_10a7f0bce7" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.map((website) =>
          <Card key={website.id} hover padding="none" className="group overflow-hidden">
                <div data-ev-id="ev_37f6d1e5ce" className="relative aspect-video bg-muted overflow-hidden">
                  {website.thumbnail ?
              <img data-ev-id="ev_fe5ff74672"
              src={website.thumbnail}
              alt={website.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> :


              <div data-ev-id="ev_f121ba2a48" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <Globe className="w-12 h-12 text-muted-foreground" />
                    </div>
              }
                  <div data-ev-id="ev_a776ebe8dc" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div data-ev-id="ev_34c0900092" className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/editor/${website.id}`)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1" onClick={() => navigate(`/preview/${website.id}`)}>
                      Preview
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div data-ev-id="ev_21dd74cd8c" className="flex items-start justify-between gap-2">
                    <div data-ev-id="ev_8ca6671d95" className="min-w-0">
                      <h3 data-ev-id="ev_403d182506" className="font-semibold text-foreground truncate">{website.name}</h3>
                      <p data-ev-id="ev_0096a00361" className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(website.updatedAt)}
                      </p>
                    </div>
                    <div data-ev-id="ev_8e3edeb661" className="flex items-center gap-2">
                      <Badge
                    variant={website.status === 'published' ? 'success' : 'default'}
                    dot
                    size="sm">

                        {website.status === 'published' ? 'Live' : 'Draft'}
                      </Badge>
                      <WebsiteActions website={website} />
                    </div>
                  </div>
                  {website.url &&
              <button data-ev-id="ev_d75636c120"
              onClick={() => copyToClipboard(website.url!)}
              className="mt-3 text-xs text-primary hover:text-primary-hover truncate block max-w-full">

                      {website.url}
                    </button>
              }
                </CardContent>
              </Card>
          )}
          </div> :

        <div data-ev-id="ev_a921dd1433" className="flex flex-col gap-3">
            {filteredWebsites.map((website) =>
          <Card key={website.id} hover padding="none" className="group">
                <div data-ev-id="ev_9e296518a9" className="flex items-center gap-4 p-4">
                  <div data-ev-id="ev_8a3cd60a00" className="w-20 h-14 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    {website.thumbnail ?
                <img data-ev-id="ev_ce24a3d0e2"
                src={website.thumbnail}
                alt={website.name}
                className="w-full h-full object-cover" /> :


                <div data-ev-id="ev_fd1de07faa" className="w-full h-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-muted-foreground" />
                      </div>
                }
                  </div>
                  <div data-ev-id="ev_70b580c013" className="flex-1 min-w-0">
                    <div data-ev-id="ev_3a6fa39876" className="flex items-center gap-2">
                      <h3 data-ev-id="ev_0e18aee5ed" className="font-semibold text-foreground">{website.name}</h3>
                      <Badge
                    variant={website.status === 'published' ? 'success' : 'default'}
                    dot
                    size="sm">

                        {website.status === 'published' ? 'Live' : 'Draft'}
                      </Badge>
                    </div>
                    <div data-ev-id="ev_15ee7c00da" className="flex items-center gap-4 mt-1">
                      <p data-ev-id="ev_486c6fb3c2" className="text-sm text-muted-foreground">
                        Edited {formatDate(website.updatedAt)}
                      </p>
                      {website.url &&
                  <p data-ev-id="ev_86cb70bfc4" className="text-sm text-primary truncate">{website.url}</p>
                  }
                    </div>
                  </div>
                  <div data-ev-id="ev_e3c1bc9eeb" className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/editor/${website.id}`)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/preview/${website.id}`)}>
                      Preview
                    </Button>
                  </div>
                  <WebsiteActions website={website} />
                </div>
              </Card>
          )}
          </div>
        }

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          title="Delete Website"
          description={`Are you sure you want to delete "${deleteModal?.name}"? This action cannot be undone.`}>

          <div data-ev-id="ev_144c9e1ae3" className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => deleteModal && handleDelete(deleteModal)}>
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </AppLayout>);

}