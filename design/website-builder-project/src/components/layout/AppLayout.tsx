import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-ev-id="ev_cfeefe3901" className="min-h-screen bg-background-secondary flex">
      <Sidebar />
      <div data-ev-id="ev_fb1a23de51" className="flex-1 flex flex-col min-w-0">
        <Header />
        <main data-ev-id="ev_17c27f7332" className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>);

}