import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Globe,
  LayoutTemplate,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
{ id: 'websites', label: 'My Websites', icon: Globe, path: '/websites' },
{ id: 'templates', label: 'Templates', icon: LayoutTemplate, path: '/templates' },
{ id: 'billing', label: 'Billing', icon: CreditCard, path: '/billing' }];


const bottomItems = [
{ id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
{ id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' }];


export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const showUpgradeBanner = user?.plan === 'free';

  const NavItem = ({ item }: {item: typeof navItems[0];}) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    const button =
    <button data-ev-id="ev_c908ee8f52"
    onClick={() => navigate(item.path)}
    className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
          text-sm font-medium transition-all duration-200
          ${isActive ?
    'bg-primary text-primary-foreground shadow-sm' :
    'text-foreground-secondary hover:bg-muted hover:text-foreground'}
        `
    }>

        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span data-ev-id="ev_37fe6b7223">{item.label}</span>}
      </button>;


    if (collapsed) {
      return <Tooltip content={item.label} position="right">{button}</Tooltip>;
    }

    return button;
  };

  return (
    <aside data-ev-id="ev_23b5f4a69b"
    className={`
        ${collapsed ? 'w-[72px]' : 'w-64'}
        h-screen sticky top-0 bg-surface border-r border-border
        flex flex-col transition-all duration-300 ease-out
      `}>

      {/* Logo */}
      <div data-ev-id="ev_2d1eb6f471" className={`h-16 flex items-center ${collapsed ? 'justify-center px-3' : 'px-5'} border-b border-border`}>
        <div data-ev-id="ev_aa3c1ba830" className="flex items-center gap-2">
          <div data-ev-id="ev_68e135a3c0" className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!collapsed && <span data-ev-id="ev_b44f7ec934" className="font-bold text-lg text-foreground">SiteForge</span>}
        </div>
      </div>

      {/* Main Nav */}
      <nav data-ev-id="ev_40a54c7760" className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) =>
        <NavItem key={item.id} item={item} />
        )}
      </nav>

      {/* Bottom Nav */}
      <div data-ev-id="ev_09d52a894a" className="p-3 border-t border-border flex flex-col gap-1">
        {bottomItems.map((item) =>
        <NavItem key={item.id} item={item} />
        )}
      </div>

      {/* Collapse Button */}
      <button data-ev-id="ev_951b3c6b64"
      onClick={() => setCollapsed(!collapsed)}
      className="
          absolute -right-3 top-20 w-6 h-6 rounded-full
          bg-surface border border-border shadow-sm
          flex items-center justify-center
          hover:bg-muted transition-colors
        ">






        {collapsed ?
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" /> :

        <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
        }
      </button>

      {/* Upgrade Banner */}
      {!collapsed && showUpgradeBanner && (
        <div data-ev-id="ev_32f5139f23" className="p-3">
          <div data-ev-id="ev_8729fcab3c" className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <p data-ev-id="ev_d815e5f959" className="text-sm font-medium text-foreground mb-1">Upgrade to Pro</p>
            <p data-ev-id="ev_7daa3fa1c3" className="text-xs text-muted-foreground mb-3">Unlock premium templates & features</p>
            <Button size="sm" className="w-full" onClick={() => navigate('/billing')} leftIcon={<Crown className="w-3.5 h-3.5" />}>
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </aside>);

}