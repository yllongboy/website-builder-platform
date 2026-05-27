import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { authInterceptor } from '@platform/auth';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Globe,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Search,
  Sparkles,
  Tag,
  Users,
  TrendingUp,
  Eye,
  Plus
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        Bell,
        ChevronDown,
        ChevronLeft,
        ChevronRight,
        CreditCard,
        Globe,
        LayoutDashboard,
        LayoutTemplate,
        LogOut,
        Search,
        Sparkles,
        Tag,
        Users,
        TrendingUp,
        Eye,
        Plus,
      }),
    },
  ],
};