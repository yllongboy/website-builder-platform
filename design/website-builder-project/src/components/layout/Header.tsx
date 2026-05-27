import { useState } from 'react';
import { Bell, Plus, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <header data-ev-id="ev_0f316a7e6c" className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Search */}
      <div data-ev-id="ev_ad230d1c0c" className="flex-1 max-w-md">
        <Input
          isSearch
          placeholder="Search websites, templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background-secondary border-transparent focus:bg-surface" />

      </div>

      {/* Actions */}
      <div data-ev-id="ev_472e152b50" className="flex items-center gap-3">
        <Button
          onClick={() => navigate('/editor/new')}
          leftIcon={<Plus className="w-4 h-4" />}>

          New Website
        </Button>

        {/* Notifications */}
        <Dropdown
          align="right"
          trigger={
          <button data-ev-id="ev_ebd7220546" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-foreground-secondary" />
              <span data-ev-id="ev_9328f17dbe" className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
          }>

          <div data-ev-id="ev_2c23d63ce9" className="px-3 py-2 border-b border-border">
            <p data-ev-id="ev_9a525a78fd" className="font-semibold text-foreground">Notifications</p>
          </div>
          <div data-ev-id="ev_7ff5841c50" className="py-2 px-3">
            <p data-ev-id="ev_1bf9e3abf6" className="text-sm text-muted-foreground">No new notifications</p>
          </div>
        </Dropdown>

        {/* User Menu */}
        <Dropdown
          align="right"
          trigger={
          <button data-ev-id="ev_ecdc6cbdfd" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <Avatar src={user?.avatar} alt={user?.name || 'User'} size="sm" />
              <div data-ev-id="ev_9ea3f38b0a" className="hidden sm:block text-left">
                <p data-ev-id="ev_e7106e43ff" className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                <Badge variant="primary" size="sm">{user?.plan === 'pro' ? 'Pro' : user?.plan === 'enterprise' ? 'Enterprise' : 'Free'}</Badge>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </button>
          }>

          <div data-ev-id="ev_b4a0f42fd0" className="px-3 py-2 border-b border-border">
            <p data-ev-id="ev_58cc79c8ba" className="font-medium text-foreground">{user?.name || 'User'}</p>
            <p data-ev-id="ev_36b371e1ce" className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
          </div>
          <DropdownItem onClick={() => navigate('/settings')}>Settings</DropdownItem>
          <DropdownItem onClick={() => navigate('/billing')}>Billing</DropdownItem>
          <DropdownSeparator />
          <DropdownItem destructive onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>);

}